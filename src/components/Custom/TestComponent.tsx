"use client"
import { useState as reactUseState, useEffect } from 'react';

// Custom useState implementation
const createCustomUseState = () => {
  let states = [];
  let setters = [];
  let currentIndex = 0;
  const useState = (initialValue) => {
    const index = currentIndex;
    
    // Initialize state if needed
    if (states[index] === undefined) {
      states[index] = initialValue;
      setters[index] = (newValue) => {
        if (typeof newValue === 'function') {
          states[index] = newValue(states[index]);
        } else {
          states[index] = newValue;
        }
        // Trigger re-render logic here
        forceUpdate();
      };
    }
    
    currentIndex++;
    return [states[index], setters[index]];
  };

  const resetIndex = () => {
    currentIndex = 0;
  };

  return { useState, resetIndex, getStates: () => states };
};

// Create an instance of our custom useState
const { useState: customUseState, resetIndex, getStates } = createCustomUseState();

// Test Component using custom useState
const TestComponent = () => {
  const [count, setCount] = customUseState(0);
  const [text, setText] = customUseState("Hello");
  
  // Use React's useState for comparison
  const [reactCount, setReactCount] = reactUseState(0);
  
  // Reset our custom hook's index on each render
  useEffect(() => {
    resetIndex();
  });

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Custom useState Test</h2>
        <div className="space-y-1">
          <p>Count: {count}</p>
          <p>Text: {text}</p>
        </div>
        <div className="space-x-2">
          <button 
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => setCount(prev => prev + 1)}
          >
            Increment Count
          </button>
          <button 
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={() => setText(prev => prev + "!")}
          >
            Add Exclamation
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">React's useState Comparison</h2>
        <p>React Count: {reactCount}</p>
        <button 
          className="px-3 py-1 bg-purple-500 text-white rounded"
          onClick={() => setReactCount(prev => prev + 1)}
        >
          Increment React Count
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-bold">Internal State:</h3>
        <pre className="mt-2 text-sm">
          {JSON.stringify(getStates(), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestComponent;