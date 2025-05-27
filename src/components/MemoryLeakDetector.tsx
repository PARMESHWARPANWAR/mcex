// 'use client';

// import { useEffect, useState } from 'react';

// export function MemoryLeakDetector() {
//   const [memoryHistory, setMemoryHistory] = useState<Array<{time: string, memory: number}>>([]);
//   const [leakDetected, setLeakDetected] = useState(false);

//   useEffect(() => {
//     let intervalId: NodeJS.Timeout;
    
//     const trackMemory = () => {
//       if ('memory' in performance) {
//         const memory = (performance as any).memory;
//         const used = Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
//         const time = new Date().toLocaleTimeString();
        
//         setMemoryHistory(prev => {
//           const updated = [...prev, { time, memory: used }].slice(-20); // Keep last 20 readings
          
//           // Detect memory leak (consistent growth over 10 readings)
//           if (updated.length >= 10) {
//             const first = updated[0].memory;
//             const last = updated[updated.length - 1].memory;
//             const growth = last - first;
            
//             if (growth > 50) { // 50MB+ growth is suspicious
//               setLeakDetected(true);
//               console.error('🚨 MEMORY LEAK DETECTED!', {
//                 startMemory: `${first}MB`,
//                 currentMemory: `${last}MB`,
//                 growth: `+${growth}MB`,
//                 history: updated
//               });
//             }
//           }
          
//           return updated;
//         });
        
//         // Log high memory usage
//         if (used > 200) {
//           console.warn('⚠️ High memory usage:', {
//             used: `${used}MB`,
//             total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB`,
//             limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`
//           });
//         }
//       }
//     };

//     // Track every 3 seconds
//     intervalId = setInterval(trackMemory, 3000);
//     trackMemory(); // Initial reading

//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, []);

//   useEffect(() => {
//     // Track component mount/unmount
//     console.log('🔍 MemoryLeakDetector mounted');
//     return () => {
//       console.log('🔍 MemoryLeakDetector unmounted');
//     };
//   }, []);

//   if (process.env.NODE_ENV !== 'development') {
//     return null;
//   }

//   return (
//     <div style={{
//       position: 'fixed',
//       bottom: 10,
//       left: 10,
//       background: leakDetected ? '#ff4444' : 'rgba(0,0,0,0.8)',
//       color: 'white',
//       padding: '10px',
//       borderRadius: '5px',
//       fontSize: '12px',
//       maxWidth: '300px',
//       zIndex: 9999,
//       fontFamily: 'monospace'
//     }}>
//       <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
//         {leakDetected ? '🚨 MEMORY LEAK!' : '📊 Memory Monitor'}
//       </div>
//       {memoryHistory.slice(-3).map((entry, index) => (
//         <div key={index}>
//           {entry.time}: {entry.memory}MB
//         </div>
//       ))}
//       {leakDetected && (
//         <div style={{ marginTop: '5px', fontSize: '10px' }}>
//           Check console for details
//         </div>
//       )}
//     </div>
//   );
// }


// // Add in main layout just below children