import React from 'react';

const CodeDisplay = () => {
  return (
    <div className="max-w-3xl mx-auto mb-8 p-6 bg-white rounded-lg shadow-lg font-sans">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Main Logic: Detecting Bottom of Page for Infinite Scroll
      </h1>

      {/* Code Block Container */}
      <div className="rounded-lg overflow-hidden border border-gray-200">
        {/* Code Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
          <span className="text-sm text-gray-600">Solution 1:  Javascript</span>
          {/* <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button> */}
        </div>

        {/* Code Content */}
        <div className="p-4 bg-[#1e1e1e] overflow-x-auto font-mono text-[15px] leading-relaxed">
          <pre className="text-[#d4d4d4]">
            <code>{
            `const handleScroll = () => {
    // Check if user has scrolled to bottom of page
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight 
        && !loading && hasMore) {
            setPage(prev => prev + 1);
          }
    };`
                }
                </code>
          </pre>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200 mt-8">
        {/* Code Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
          <span className="text-sm text-gray-600">Solution 2:  Javascript</span>
          {/* <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button> */}
        </div>

        {/* Code Content */}
        <div className="p-4 bg-[#1e1e1e] overflow-x-auto font-mono text-[15px] leading-relaxed">
         {"// IntersectionObserver(callback,{threshold})"}
          <pre className="text-[#d4d4d4]">
            <code>{`
        useEffect(() => {
            const observer = new IntersectionObserver(entries => {
                const firstEntry = entries[0];
                 if (firstEntry.isIntersecting && !loading && hasMore) 
                 {
                    setPage(prev => prev + 1);
                 }
                },
                { threshold: 1.0 }
                )

            if(loaderRef.current){
                observer.observe(loaderRef.current);
            }

            return ()=> observer.disconnect();
            },[loading, hasMore]); 
            `}
            </code>
          </pre>
        </div>
      </div>

      {/* Key Components Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Key Components:</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-mono">window.scrollY</span>
            <span>Current scroll position from top</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-mono">window.innerHeight</span>
            <span>Height of browser viewport</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-mono">document.body.scrollHeight</span>
            <span>Total scrollable height</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-mono">loading</span>
            <span>Prevents multiple simultaneous requests</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-mono">hasMore</span>
            <span>Indicates if more content is available</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CodeDisplay;