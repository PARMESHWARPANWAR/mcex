"use client"
import React, { useEffect, useState } from 'react';
import { create } from 'zustand';

// Add Inter font
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Types
interface OrderBookData {
  levels: Array<{ px: string; sz: string; n: number }>;
}

interface BroadcastMessage {
  type: 'orderbook_update' | 'spread_update' | 'grouping_update' | 'connection_status' | 'leadership_change' | 'leader_resigned' | 'trades_update';
  data: any;
  timestamp: number;
}

interface OrderBookState {
  bids: OrderBookData;
  asks: OrderBookData;
  grouping: number;
  bestBid: number | null;
  bestAsk: number | null;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastUpdate: number;
  error: string | null;
  activeTab: 'orderbook' | 'trades';
  trades: Array<{
    price: string;
    size: string;
    timestamp: number;
    side: 'buy' | 'sell';
  }>;
  
  // Actions
  setOrderBookData: (data: any) => void;
  setGrouping: (grouping: number) => void;
  setConnectionStatus: (status: OrderBookState['connectionStatus'], error?: string) => void;
  setActiveTab: (tab: OrderBookState['activeTab']) => void;
  addTrades: (trades: Array<any>) => void;
  getSpread: () => { value: number; percentage: number } | null;
  
  // WebSocket management
  wsConnection: WebSocket | null;
  isLeaderTab: boolean;
  initializeWebSocket: () => void;
  closeWebSocket: () => void;
}

// Create broadcast channel for cross-tab communication
const broadcastChannel = new BroadcastChannel('orderbook_sync');

// Zustand store with centralized WebSocket
const useOrderBookStore = create<OrderBookState>((set, get) => ({
  bids: { levels: [] },
  asks: { levels: [] },
  grouping: 1,
  bestBid: null,
  bestAsk: null,
  connectionStatus: 'disconnected',
  lastUpdate: Date.now(),
  error: null,
  wsConnection: null,
  isLeaderTab: false,
  activeTab: 'orderbook',
  trades: [],
  
  setOrderBookData: (data) => {
    if (data.levels) {
      const bids = data.levels[0] || [];
      const asks = data.levels[1] || [];
      
      const bestBid = bids.length > 0 ? parseFloat(bids[0].px) : null;
      const bestAsk = asks.length > 0 ? parseFloat(asks[0].px) : null;
      
      set({
        bids: { levels: bids },
        asks: { levels: asks },
        bestBid,
        bestAsk,
        lastUpdate: Date.now(),
        error: null
      });
      
      // Broadcast to other tabs
      broadcastChannel.postMessage({
        type: 'orderbook_update',
        data: { bids: { levels: bids }, asks: { levels: asks }, bestBid, bestAsk },
        timestamp: Date.now()
      } as BroadcastMessage);
    }
  },
  
  setGrouping: (grouping) => {
    set({ grouping });
    
    // Broadcast to other tabs
    broadcastChannel.postMessage({
      type: 'grouping_update',
      data: grouping,
      timestamp: Date.now()
    } as BroadcastMessage);
  },
  
  setConnectionStatus: (status, error) => {
    set({ 
      connectionStatus: status, 
      error: error || null 
    });
    
    // Broadcast connection status to other tabs
    broadcastChannel.postMessage({
      type: 'connection_status',
      data: { status, error },
      timestamp: Date.now()
    } as BroadcastMessage);
  },
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  
  addTrades: (trades) => {
    const newTrades = [...trades, ...get().trades].slice(0, 50); // Keep only the most recent 50 trades
    
    set({ trades: newTrades });
    
    // Broadcast to other tabs
    broadcastChannel.postMessage({
      type: 'trades_update',
      data: newTrades,
      timestamp: Date.now()
    } as BroadcastMessage);
  },
  
  getSpread: () => {
    const { bestBid, bestAsk } = get();
    if (bestBid === null || bestAsk === null) return null;
    
    const value = bestAsk - bestBid;
    const percentage = (value / bestAsk) * 100;
    
    return { value, percentage };
  },
  
  initializeWebSocket: () => {
    const state = get();
    
    // Only connect if we're the leader tab and not already connected
    if (!state.isLeaderTab || state.wsConnection) return;
    
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let keepAliveInterval: NodeJS.Timeout | null = null;
    
    const connect = () => {
      try {
        set({ connectionStatus: 'connecting' });
        ws = new WebSocket('wss://api.hyperliquid.xyz/ws');
        
        ws.onopen = () => {
          console.log('Leader tab connected to Hyperliquid WebSocket');
          set({ 
            wsConnection: ws, 
            connectionStatus: 'connected',
            error: null 
          });
          
          // Subscribe to BTC order book
          ws?.send(JSON.stringify({
            method: 'subscribe',
            subscription: {
              type: 'l2Book',
              coin: 'BTC'
            }
          }));
          
          // Subscribe to BTC trades
          ws?.send(JSON.stringify({
            method: 'subscribe',
            subscription: {
              type: 'trades',
              coin: 'BTC'
            }
          }));
          
          // Keep alive ping every 30s
          keepAliveInterval = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ method: 'ping' }));
            }
          }, 30000);
        };
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            if (data.channel === 'l2Book' && data.data) {
              get().setOrderBookData(data.data);
            }
            
            if (data.channel === 'trades' && data.data) {
              // Process trades
              const trades = data.data.map((trade: any) => ({
                price: trade.px,
                size: trade.sz,
                timestamp: new Date(trade.t).getTime(),
                side: trade.s === 'b' ? 'buy' : 'sell'
              }));
              
              if (trades.length > 0) {
                get().addTrades(trades);
              }
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          set({ 
            connectionStatus: 'error',
            error: 'WebSocket connection error' 
          });
        };
        
        ws.onclose = () => {
          console.log('WebSocket disconnected, attempting to reconnect...');
          set({ 
            wsConnection: null, 
            connectionStatus: 'disconnected' 
          });
          
          if (keepAliveInterval) {
            clearInterval(keepAliveInterval);
          }
          
          // Only reconnect if we're still the leader tab
          if (get().isLeaderTab) {
            reconnectTimeout = setTimeout(() => {
              connect();
            }, 5000);
          }
        };
        
        set({ wsConnection: ws });
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
        set({ 
          connectionStatus: 'error',
          error: 'Failed to connect to WebSocket' 
        });
      }
    };
    
    connect();
    
    // Store cleanup function
    const cleanup = () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
      }
    };
    
    // Return cleanup for later use
    set({ wsConnection: ws });
    return cleanup;
  },
  
  closeWebSocket: () => {
    const { wsConnection } = get();
    if (wsConnection) {
      wsConnection.close();
      set({ wsConnection: null, connectionStatus: 'disconnected' });
    }
  }
}));

// Tab leadership election
let tabId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
let heartbeatInterval: any = null;
let leaderCheckInterval: any = null;
let isElecting = false;

const HEARTBEAT_INTERVAL = 2000; // 2 seconds
const LEADER_TIMEOUT = 5000; // 5 seconds
const ELECTION_DELAY = 100; // 100ms delay to prevent race conditions

const updateHeartbeat = () => {
  const now = Date.now();
  localStorage.setItem(`heartbeat_${tabId}`, now.toString());
  
  if (useOrderBookStore.getState().isLeaderTab) {
    localStorage.setItem('leader_heartbeat', now.toString());
    localStorage.setItem('leader_tab_id', tabId);
  }
};

const checkForLeader = () => {
  if (isElecting) return; // Prevent multiple elections running simultaneously
  
  const leaderHeartbeat = localStorage.getItem('leader_heartbeat');
  const leaderTabId = localStorage.getItem('leader_tab_id');
  const now = Date.now();
  
  // Check if leader is alive
  if (!leaderHeartbeat || now - parseInt(leaderHeartbeat) > LEADER_TIMEOUT) {
    // Leader is dead, start election process
    startElection();
  } else if (leaderTabId === tabId && !useOrderBookStore.getState().isLeaderTab) {
    // This tab should be leader but isn't
    becomeLeader();
  } else if (leaderTabId !== tabId && useOrderBookStore.getState().isLeaderTab) {
    // This tab shouldn't be leader but is
    becomeFollower();
  }
};

const startElection = () => {
  if (isElecting) return;
  isElecting = true;
  
  // Set election flag to prevent other tabs from starting election
  const electionId = `election_${Date.now()}_${Math.random()}`;
  localStorage.setItem('election_in_progress', electionId);
  
  // Small delay to allow all tabs to see the election flag
  setTimeout(() => {
    const currentElection = localStorage.getItem('election_in_progress');
    
    // Only proceed if this tab's election is still the current one
    if (currentElection === electionId) {
      electNewLeader();
    }
    
    isElecting = false;
  }, ELECTION_DELAY);
};

const electNewLeader = () => {
  // Get all active tabs
  const now = Date.now();
  const allTabs: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('heartbeat_')) {
      const heartbeat = parseInt(localStorage.getItem(key) || '0');
      if (now - heartbeat < LEADER_TIMEOUT) {
        allTabs.push(key.replace('heartbeat_', ''));
      } else {
        // Clean up old heartbeats
        localStorage.removeItem(key);
      }
    }
  }
  
  // Sort tabs to ensure consistent election across all tabs
  allTabs.sort();
  
  // Elect the first tab as leader
  if (allTabs.length > 0 && allTabs[0] === tabId) {
    // Double-check that no other tab has become leader in the meantime
    const currentLeader = localStorage.getItem('leader_tab_id');
    const currentLeaderHeartbeat = localStorage.getItem('leader_heartbeat');
    
    if (!currentLeader || !currentLeaderHeartbeat || 
        Date.now() - parseInt(currentLeaderHeartbeat) > LEADER_TIMEOUT) {
      becomeLeader();
    }
  }
  
  // Clear election flag
  localStorage.removeItem('election_in_progress');
};

const becomeLeader = () => {
  // Atomic operation to prevent race conditions
  const now = Date.now();
  const currentLeader = localStorage.getItem('leader_tab_id');
  const currentLeaderHeartbeat = localStorage.getItem('leader_heartbeat');
  
  // Only become leader if there's no active leader
  if (!currentLeader || !currentLeaderHeartbeat || 
      now - parseInt(currentLeaderHeartbeat) > LEADER_TIMEOUT || 
      currentLeader === tabId) {
    
    console.log('This tab is becoming the leader');
    localStorage.setItem('leader_tab_id', tabId);
    localStorage.setItem('leader_heartbeat', now.toString());
    useOrderBookStore.setState({ isLeaderTab: true });
    useOrderBookStore.getState().initializeWebSocket();
    
    // Broadcast leadership change
    broadcastChannel.postMessage({
      type: 'leadership_change',
      data: { newLeader: tabId },
      timestamp: now
    });
  }
};

const becomeFollower = () => {
  console.log('This tab is becoming a follower');
  useOrderBookStore.setState({ isLeaderTab: false });
  useOrderBookStore.getState().closeWebSocket();
};

const initializeLeaderElection = () => {
  // Initial heartbeat
  updateHeartbeat();
  
  // Small delay before initial check to allow other tabs to register
  setTimeout(() => {
    checkForLeader();
  }, ELECTION_DELAY);
  
  // Set up heartbeat interval
  heartbeatInterval = setInterval(updateHeartbeat, HEARTBEAT_INTERVAL);
  
  // Set up leader check interval
  leaderCheckInterval = setInterval(checkForLeader, HEARTBEAT_INTERVAL);
  
  // Clean up on unload
  window.addEventListener('beforeunload', () => {
    const wasLeader = useOrderBookStore.getState().isLeaderTab;
    
    // Remove this tab's heartbeat
    localStorage.removeItem(`heartbeat_${tabId}`);
    
    if (wasLeader) {
      // If this tab was the leader, clear leader info to trigger immediate election
      localStorage.removeItem('leader_heartbeat');
      localStorage.removeItem('leader_tab_id');
      
      // Notify other tabs immediately
      broadcastChannel.postMessage({
        type: 'leader_resigned',
        data: { oldLeader: tabId },
        timestamp: Date.now()
      });
    }
  });
  
  // Handle visibility change (tab becomes active/inactive)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      // Tab became visible, check leadership status
      checkForLeader();
    }
  });
  
  // Clean up function
  return () => {
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    if (leaderCheckInterval) clearInterval(leaderCheckInterval);
    localStorage.removeItem(`heartbeat_${tabId}`);
  };
};

// Listen to broadcast messages
broadcastChannel.onmessage = (event: MessageEvent<BroadcastMessage>) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'orderbook_update':
      useOrderBookStore.setState({
        bids: data.bids,
        asks: data.asks,
        bestBid: data.bestBid,
        bestAsk: data.bestAsk,
        lastUpdate: Date.now()
      });
      break;
    
    case 'grouping_update':
      useOrderBookStore.setState({ grouping: data });
      break;
    
    case 'connection_status':
      useOrderBookStore.setState({ 
        connectionStatus: data.status,
        error: data.error || null
      });
      break;
      
    case 'leadership_change':
      // Re-check leadership status when leadership changes
      checkForLeader();
      break;
      
    case 'leader_resigned':
      // Leader has resigned, immediate election needed
      setTimeout(() => {
        checkForLeader();
      }, ELECTION_DELAY);
      break;
      
    case 'trades_update':
      useOrderBookStore.setState({ 
        trades: data
      });
      break;
  }
};

// Utility functions
const formatPrice = (price: string | number, decimals: number = 2): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toFixed(decimals);
};

const formatSize = (size: string | number, decimals: number = 4): string => {
  const num = typeof size === 'string' ? parseFloat(size) : size;
  return num.toFixed(decimals);
};

const groupOrderBookData = (
  levels: Array<{ px: string; sz: string; n: number }>,
  grouping: number
): Array<{ price: number; size: number; total: number }> => {
  const grouped: { [key: string]: number } = {};
  
  levels.forEach(level => {
    const price = parseFloat(level.px);
    const size = parseFloat(level.sz);
    const groupedPrice = Math.floor(price / grouping) * grouping;
    
    if (grouped[groupedPrice]) {
      grouped[groupedPrice] += size;
    } else {
      grouped[groupedPrice] = size;
    }
  });
  
  const result = Object.entries(grouped).map(([price, size]) => ({
    price: parseFloat(price),
    size,
    total: 0
  }));
  
  // Sort and calculate cumulative totals
  result.sort((a, b) => b.price - a.price); // Descending for bids
  let cumulativeTotal = 0;
  
  for (let i = 0; i < result.length; i++) {
    cumulativeTotal += result[i].size;
    result[i].total = cumulativeTotal;
  }
  
  return result;
};

// Main Order Book Component
const OrderBook: React.FC = () => {
  const { 
    bids, 
    asks, 
    grouping, 
    connectionStatus,
    error,
    lastUpdate,
    isLeaderTab,
    activeTab,
    setGrouping,
    setActiveTab,
    getSpread 
  } = useOrderBookStore();
  
  // Initialize leader election on mount
  useEffect(() => {
    const cleanup = initializeLeaderElection();
    
    return () => {
      cleanup();
    };
  }, []);
  
  // Process order book data
  const processedBids = groupOrderBookData(bids.levels, grouping);
  const processedAsks = groupOrderBookData(asks.levels, grouping);
  
  // For asks, reverse the cumulative calculation
  processedAsks.sort((a, b) => a.price - b.price); // Ascending for asks
  let cumulativeTotal = 0;
  for (let i = 0; i < processedAsks.length; i++) {
    cumulativeTotal += processedAsks[i].size;
    processedAsks[i].total = cumulativeTotal;
  }
  
  const maxBidSize = Math.max(...processedBids.map(b => b.size), 0);
  const maxAskSize = Math.max(...processedAsks.map(a => a.size), 0);
  const maxSize = Math.max(maxBidSize, maxAskSize);
  
  const spread = getSpread();
  
  // Format timestamp
  const lastUpdateTime = new Date(lastUpdate).toLocaleTimeString();
  
  return (
    <div className="bg-gray-900 text-white" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
        <div className="flex items-center space-x-4">
          <div 
            className={`py-2 cursor-pointer ${activeTab === 'orderbook' ? 'text-white border-b-2 border-teal-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('orderbook')}
          >
            Order Book
          </div>
          <div 
            className={`py-2 cursor-pointer ${activeTab === 'trades' ? 'text-white border-b-2 border-teal-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('trades')}
          >
            Trades
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Connection Status */}
          <div className={`w-2 h-2 rounded-full ${
            connectionStatus === 'connected' ? 'bg-green-500' : 
            connectionStatus === 'error' ? 'bg-red-500' : 
            'bg-yellow-500'
          }`} title={connectionStatus}></div>
          
          {/* Leader Indicator (only in dev mode) */}
          {isLeaderTab && process.env.NODE_ENV === 'development' && (
            <div className="text-blue-400 text-xs">L</div>
          )}
          
          <div className="text-gray-400 hover:text-white cursor-pointer">⋮</div>
        </div>
      </div>
      
      {activeTab === 'orderbook' ? (
        <>
          {/* Grouping and Currency Section */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
            <select 
              value={grouping} 
              onChange={(e) => setGrouping(parseFloat(e.target.value))}
              className="bg-gray-800 text-white px-2 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="500">500</option>
            </select>
            
            <div className="text-white font-medium">BTC</div>
          </div>
          
          {/* Column Headers */}
          <div className="flex justify-between px-4 py-2 text-sm text-gray-500 border-b border-gray-800">
            <div className="flex-1">Price</div>
            <div className="flex-1 text-right">Size (BTC)</div>
            <div className="flex-1 text-right">Total (BTC)</div>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="mx-4 mb-2 bg-red-900/20 border border-red-600/50 text-red-400 px-3 py-2 rounded text-xs">
              {error}
            </div>
          )}
          
          {/* Asks (Sell Orders) */}
          <div>
            {processedAsks.slice(0, 11).reverse().map((ask, index) => (
              <OrderBookRow
                key={`ask-${index}`}
                price={ask.price}
                size={ask.size}
                total={ask.total}
                type="ask"
                maxSize={maxSize}
              />
            ))}
          </div>
          
          {/* Spread Display */}
          <div className="bg-gray-800 px-4 py-2 my-px">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Spread</span>
              <span className="text-white font-mono">
                {spread ? formatPrice(spread.value, 0) : '0'}
              </span>
              <span className="text-gray-400 font-mono">
                {spread ? `${formatPrice(spread.percentage, 3)}%` : '0.000%'}
              </span>
            </div>
          </div>
          
          {/* Bids (Buy Orders) */}
          <div>
            {processedBids.slice(0, 11).map((bid, index) => (
              <OrderBookRow
                key={`bid-${index}`}
                price={bid.price}
                size={bid.size}
                total={bid.total}
                type="bid"
                maxSize={maxSize}
              />
            ))}
          </div>
        </>
      ) : (
        <Trades />
      )}
      
      {/* Connection Info (Dev Mode) - Very minimal and hidden in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="px-4 py-1 border-t border-gray-800 text-xs text-gray-600 opacity-60">
          <div>Last update: {lastUpdateTime}</div>
        </div>
      )}
    </div>
  );
};

// Order Book Row Component
const OrderBookRow: React.FC<{
  price: number;
  size: number;
  total: number;
  type: 'bid' | 'ask';
  maxSize: number;
}> = ({ price, size, total, type, maxSize }) => {
  const depthPercentage = (size / maxSize) * 100;
  
  return (
    <div className="relative flex justify-between px-4 py-0.5 hover:bg-gray-800/30 transition-colors">
      <div 
        className={`absolute left-0 top-0 bottom-0 opacity-15 ${
          type === 'bid' ? 'bg-green-500' : 'bg-red-500'
        }`}
        style={{ 
          width: `${depthPercentage}%`,
          transition: 'width 0.3s ease'
        }}
      />
      <div className={`relative z-10 flex-1 font-mono text-sm ${
        type === 'bid' ? 'text-green-400' : 'text-red-400'
      }`}>
        {formatPrice(price, price < 10 ? 3 : price < 100 ? 2 : price < 1000 ? 1 : 0)}
      </div>
      <div className="relative z-10 flex-1 text-right font-mono text-sm text-gray-300">
        {formatSize(size, 5)}
      </div>
      <div className="relative z-10 flex-1 text-right font-mono text-sm text-gray-300">
        {formatSize(total, 5)}
      </div>
    </div>
  );
};

// // Main Order Book Component
// const OrderBook: React.FC = () => {
//   const { 
//     bids, 
//     asks, 
//     grouping, 
//     connectionStatus,
//     error,
//     lastUpdate,
//     isLeaderTab,
//     setGrouping, 
//     getSpread 
//   } = useOrderBookStore();
  
//   // Initialize leader election on mount
//   useEffect(() => {
//     const cleanup = initializeLeaderElection();
    
//     return () => {
//       cleanup();
//     };
//   }, []);
  
//   // Process order book data
//   const processedBids = groupOrderBookData(bids.levels, grouping);
//   const processedAsks = groupOrderBookData(asks.levels, grouping);
  
//   // For asks, reverse the cumulative calculation
//   processedAsks.sort((a, b) => a.price - b.price); // Ascending for asks
//   let cumulativeTotal = 0;
//   for (let i = 0; i < processedAsks.length; i++) {
//     cumulativeTotal += processedAsks[i].size;
//     processedAsks[i].total = cumulativeTotal;
//   }
  
//   const maxBidSize = Math.max(...processedBids.map(b => b.size), 0);
//   const maxAskSize = Math.max(...processedAsks.map(a => a.size), 0);
//   const maxSize = Math.max(maxBidSize, maxAskSize);
  
//   const spread = getSpread();
  
//   // Format timestamp
//   const lastUpdateTime = new Date(lastUpdate).toLocaleTimeString();
  
//   return (
//     <div className="bg-gray-900 text-white" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
//       {/* Header Section */}
//       <div className="flex items-center justify-between border-b border-gray-800 px-4 py-2">
//         <div className="flex items-center space-x-4">
//           <div className="text-white font-medium">Order Book</div>
//           <div className="text-teal-500 border-b-2 border-teal-500 pb-2 -mb-2"></div>
//           <div className="text-gray-400 hover:text-white transition-colors cursor-pointer">Trades</div>
//         </div>
//         <div className="flex items-center space-x-3">
//           {/* Connection Status */}
//           <div className={`w-2 h-2 rounded-full ${
//             connectionStatus === 'connected' ? 'bg-green-500' : 
//             connectionStatus === 'error' ? 'bg-red-500' : 
//             'bg-yellow-500'
//           }`} title={connectionStatus}></div>
          
//           {/* Leader Indicator (only in dev mode) */}
//           {isLeaderTab && process.env.NODE_ENV === 'development' && (
//             <div className="text-blue-400 text-xs">L</div>
//           )}
          
//           <div className="text-gray-400 hover:text-white cursor-pointer">⋮</div>
//         </div>
//       </div>
      
//       {/* Grouping and Currency Section */}
//       <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
//         <select 
//           value={grouping} 
//           onChange={(e) => setGrouping(parseFloat(e.target.value))}
//           className="bg-gray-800 text-white px-2 py-1 rounded text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
//         >
//           <option value="1">1</option>
//           <option value="10">10</option>
//           <option value="50">50</option>
//           <option value="100">100</option>
//           <option value="500">500</option>
//         </select>
        
//         <div className="text-white font-medium">BTC</div>
//       </div>
      
//       {/* Column Headers */}
//       <div className="flex justify-between px-4 py-2 text-sm text-gray-500 border-b border-gray-800">
//         <div className="flex-1">Price</div>
//         <div className="flex-1 text-right">Size (BTC)</div>
//         <div className="flex-1 text-right">Total (BTC)</div>
//       </div>
      
//       {/* Error Display */}
//       {error && (
//         <div className="mx-4 mb-2 bg-red-900/20 border border-red-600/50 text-red-400 px-3 py-2 rounded text-xs">
//           {error}
//         </div>
//       )}
      
//       {/* Asks (Sell Orders) */}
//       <div>
//         {processedAsks.slice(0, 11).reverse().map((ask, index) => (
//           <OrderBookRow
//             key={`ask-${index}`}
//             price={ask.price}
//             size={ask.size}
//             total={ask.total}
//             type="ask"
//             maxSize={maxSize}
//           />
//         ))}
//       </div>
      
//       {/* Spread Display */}
//       <div className="bg-gray-800 px-4 py-2 my-px">
//         <div className="flex justify-between items-center text-sm">
//           <span className="text-gray-400">Spread</span>
//           <span className="text-white font-mono">
//             {spread ? formatPrice(spread.value, 0) : '0'}
//           </span>
//           <span className="text-gray-400 font-mono">
//             {spread ? `${formatPrice(spread.percentage, 3)}%` : '0.000%'}
//           </span>
//         </div>
//       </div>
      
//       {/* Bids (Buy Orders) */}
//       <div>
//         {processedBids.slice(0, 11).map((bid, index) => (
//           <OrderBookRow
//             key={`bid-${index}`}
//             price={bid.price}
//             size={bid.size}
//             total={bid.total}
//             type="bid"
//             maxSize={maxSize}
//           />
//         ))}
//       </div>
      
//       {/* Connection Info (Dev Mode) - Very minimal and hidden in production */}
//       {process.env.NODE_ENV === 'development' && (
//         <div className="px-4 py-1 border-t border-gray-800 text-xs text-gray-600 opacity-60">
//           <div>Last update: {lastUpdateTime}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// Main App Component
const HyperliquidOrderBookAndTradesApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">
          Hyperliquid Trading Interface
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Book / Trades Component */}
          <div className="lg:col-span-1">
            <OrderBook />
          </div>
          
          {/* Skeleton placeholders for other components */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 rounded-lg h-96 p-4 border border-gray-800">
              <div className="text-gray-500 text-center pt-32">
                Chart Component (Placeholder)
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg h-48 p-4 border border-gray-800">
              <div className="text-gray-500 text-center pt-16">
                Trading Form (Placeholder)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HyperliquidOrderBookAndTradesApp;