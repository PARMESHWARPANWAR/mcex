'use client'
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

interface OrderBookState {
  bids: OrderBookData;
  asks: OrderBookData;
  grouping: number;
  bestBid: number | null;
  bestAsk: number | null;
  setOrderBookData: (data: any) => void;
  setGrouping: (grouping: number) => void;
  getSpread: () => { value: number; percentage: number } | null;
}

// Zustand store with multi-tab sync
const useOrderBookStore = create<OrderBookState>((set, get) => ({
  bids: { levels: [] },
  asks: { levels: [] },
  grouping: 1,
  bestBid: null,
  bestAsk: null,
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
        bestAsk
      });
      
      // Sync to other tabs
      localStorage.setItem('orderBookData', JSON.stringify({ 
        bids: { levels: bids }, 
        asks: { levels: asks },
        bestBid,
        bestAsk
      }));
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'orderBookData',
        newValue: JSON.stringify({ 
          bids: { levels: bids }, 
          asks: { levels: asks },
          bestBid,
          bestAsk
        })
      }));
    }
  },
  setGrouping: (grouping) => {
    set({ grouping });
    
    // Sync to other tabs
    localStorage.setItem('orderBookGrouping', grouping.toString());
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'orderBookGrouping',
      newValue: grouping.toString()
    }));
  },
  getSpread: () => {
    const { bestBid, bestAsk } = get();
    if (bestBid === null || bestAsk === null) return null;
    
    const value = bestAsk - bestBid;
    const percentage = (value / bestAsk) * 100;
    
    return { value, percentage };
  }
}));

// WebSocket connection
const connectWebSocket = (onData: (data: any) => void, onError: (error: Error) => void) => {
  let ws: WebSocket | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;
  let keepAliveInterval: NodeJS.Timeout | null = null;
  
  const connect = () => {
    try {
      ws = new WebSocket('wss://api.hyperliquid.xyz/ws');
      
      ws.onopen = () => {
        console.log('Connected to Hyperliquid WebSocket');
        
        // Subscribe to BTC order book
        ws?.send(JSON.stringify({
          method: 'subscribe',
          subscription: {
            type: 'l2Book',
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
            onData(data.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        onError(new Error('WebSocket connection error'));
      };
      
      ws.onclose = () => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        if (keepAliveInterval) {
          clearInterval(keepAliveInterval);
        }
        
        // Reconnect after 5 seconds
        reconnectTimeout = setTimeout(() => {
          connect();
        }, 5000);
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      onError(error as Error);
    }
  };
  
  connect();
  
  return () => {
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
};

// Utility functions
const formatPrice = (price: string | number, decimals: number = 2): string => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

const formatSize = (size: string | number, decimals: number = 4): string => {
  const num = typeof size === 'string' ? parseFloat(size) : size;
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
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
    total: 0 // Will be calculated later
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
    <div className={`relative flex justify-between py-1 px-3 hover:bg-gray-50 transition-colors ${
      type === 'bid' ? 'text-green-600' : 'text-red-600'
    }`}>
      <div 
        className={`absolute inset-0 opacity-20 ${
          type === 'bid' ? 'bg-green-500' : 'bg-red-500'
        }`}
        style={{ width: `${depthPercentage}%` }}
      />
      <div className="relative z-10 flex-1 font-mono text-sm">
        {formatPrice(price)}
      </div>
      <div className="relative z-10 flex-1 text-right font-mono text-sm text-gray-900">
        {formatSize(size)}
      </div>
      <div className="relative z-10 flex-1 text-right font-mono text-sm text-gray-600">
        {formatSize(total)}
      </div>
    </div>
  );
};

// Main Order Book Component
const OrderBook: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { 
    bids, 
    asks, 
    grouping, 
    setOrderBookData, 
    setGrouping, 
    getSpread 
  } = useOrderBookStore();
  
  // Set up WebSocket connection
  useEffect(() => {
    const cleanup = connectWebSocket(
      (data) => {
        setOrderBookData(data);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );
    
    return cleanup;
  }, [setOrderBookData]);
  
  // Set up multi-tab sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'orderBookData' && e.newValue) {
        const data = JSON.parse(e.newValue);
        setOrderBookData(data);
      } else if (e.key === 'orderBookGrouping' && e.newValue) {
        setGrouping(parseInt(e.newValue));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Load initial data from localStorage
    const storedData = localStorage.getItem('orderBookData');
    const storedGrouping = localStorage.getItem('orderBookGrouping');
    
    if (storedData) {
      setOrderBookData(JSON.parse(storedData));
    }
    if (storedGrouping) {
      setGrouping(parseInt(storedGrouping));
    }
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setOrderBookData, setGrouping]);
  
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
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-4" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-3">Order Book Status:{'Conneted'}</h2>
        
        {/* Grouping Selector */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <label htmlFor="grouping" className="text-sm text-gray-600">
              Grouping:
            </label>
            <select 
              id="grouping"
              value={grouping} 
              onChange={(e) => setGrouping(parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 USD</option>
              <option value="10">10 USD</option>
              <option value="20">20 USD</option>
              <option value="50">50 USD</option>
              <option value="100">100 USD</option>
            </select>
          </div>
          
          {/* Spread Display */}
          {spread && (
            <div className="text-sm">
              <span className="text-gray-600">Spread: </span>
              <span className="font-medium">
                ${formatPrice(spread.value, 2)} ({formatPrice(spread.percentage, 3)}%)
              </span>
            </div>
          )}
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm mb-3">
            Error: {error}
          </div>
        )}
      </div>
      
      {/* Column Headers */}
      <div className="flex justify-between px-3 py-2 border-b border-gray-200 text-sm font-medium text-gray-600">
        <div className="flex-1">Price (USD)</div>
        <div className="flex-1 text-right">Size (BTC)</div>
        <div className="flex-1 text-right">Total (BTC)</div>
      </div>
      
      {/* Asks (Sell Orders) */}
      <div className="max-h-48 overflow-y-auto">
        {processedAsks.slice(0, 15).reverse().map((ask, index) => (
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
      
      {/* Mid Line with Current Price */}
      <div className="my-2 px-3 py-2 bg-gray-100 border-y border-gray-200">
        <div className="text-center font-medium text-lg">
          ${processedBids.length > 0 && processedAsks.length > 0 
            ? formatPrice((processedBids[0].price + processedAsks[0].price) / 2)
            : '---'
          }
        </div>
      </div>
      
      {/* Bids (Buy Orders) */}
      <div className="max-h-48 overflow-y-auto">
        {processedBids.slice(0, 15).map((bid, index) => (
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
    </div>
  );
};

// Main App Component
const HyperLiquidAppV1: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Hyperliquid Trading Interface
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Book Component */}
          <div className="lg:col-span-1">
            <OrderBook />
          </div>
          
          {/* Skeleton placeholders for other components */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-lg h-96 p-4">
              <div className="text-gray-500 text-center pt-32">
                Chart Component (Placeholder)
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg h-48 p-4">
              <div className="text-gray-500 text-center pt-16">
                Trading Form (Placeholder)
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-lg h-64 p-4">
            <div className="text-gray-500 text-center pt-24">
              Trades Component (Placeholder)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HyperLiquidAppV1;