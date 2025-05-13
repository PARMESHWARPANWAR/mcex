'use client'
import React, { useState, useEffect } from 'react';

const HttpClientAnimation = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState(null);

    const steps = [
        {
            id: 'initial',
            title: 'Client Request',
            description: 'Application makes a request through the HTTP Client',
            activeComponents: ['app', 'client']
        },
        {
            id: 'request-interceptors',
            title: 'Request Interceptors',
            description: 'Request passes through interceptors (auth, logging, etc.)',
            activeComponents: ['client', 'request-interceptors']
        },
        {
            id: 'cache-check',
            title: 'Cache Check',
            description: 'Client checks if the request is cached',
            activeComponents: ['client', 'cache']
        },
        {
            id: 'fetch',
            title: 'Fetch Request',
            description: 'If not cached, fetch from server',
            activeComponents: ['client', 'fetch', 'server']
        },
        {
            id: 'retry',
            title: 'Retry Logic',
            description: 'If request fails, retry with exponential backoff',
            activeComponents: ['client', 'retry', 'server']
        },
        {
            id: 'response-interceptors',
            title: 'Response Interceptors',
            description: 'Response passes through interceptors',
            activeComponents: ['client', 'response-interceptors']
        },
        {
            id: 'cache-store',
            title: 'Cache Storage',
            description: 'Successful responses are cached',
            activeComponents: ['client', 'cache']
        },
        {
            id: 'complete',
            title: 'Complete',
            description: 'Response returned to application',
            activeComponents: ['app', 'client']
        }

    ];

    const features = [
        {
            id: 'interceptors',
            title: 'Interceptors',
            description: 'Modify requests/responses before they are sent/received',
            code: `// Request Interceptor
    client.addRequestInterceptor(async (config) => {
      config.headers.Authorization = \`Bearer \${token}\`;
      return config;
    });
    
    // Response Interceptor
    client.addResponseInterceptor(async (response) => {
      if (response.status === 401) {
        window.location.href = '/login';
      }
      return response;
    });`
        },
        {
            id: 'retry',
            title: 'Retry Logic',
            description: 'Automatically retry failed requests with exponential backoff',
            code: `async retryRequest(fn, retries = 3) {
      try {
        return await fn();
      } catch (error) {
        if (retries <= 0 || (error.status >= 400 && error.status < 500)) {
          throw error;
        }
        
        const delay = 1000 * Math.pow(2, 3 - retries);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        return this.retryRequest(fn, retries - 1);
      }
    }`
        },
        {
            id: 'cache',
            title: 'Caching',
            description: 'Cache responses to reduce network requests',
            code: `// Check cache before making request
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Store successful responses
    this.setCache(cacheKey, data);`
        },
        {
            id: 'timeout',
            title: 'Timeout Control',
            description: 'Abort requests that take too long',
            code: `const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.timeout);
    
    const response = await fetch(url, {
      ...config,
      signal: controller.signal
    });`
        }
    ];

    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(() => {
                setCurrentStep((prev: any) => {
                    if (prev >= steps.length - 1) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1;
                });
            }, 2000);
            return () => clearInterval(interval);
        }

    }, [isPlaying, steps.length]);

    const isComponentActive = (component: React.FC) => {
        return steps[currentStep].activeComponents.includes(component);
    };

    return (
    <div className="animation-container">
            <div className="architecture-diagram">
                <svg viewBox="0 0 800 500" className="diagram-svg">
                    {/* Application */}
                    <rect
                        x="50"
                        y="50"
                        width="120"
                        height="80"
                        className={`component ${isComponentActive('app') ? 'active' : ''}`}
                        fill="#3B82F6"
                        rx="8"
                    />
                    <text x="110" y="95" className="component-text" textAnchor="middle">
                        Application
                    </text>

                    {/* HTTP Client */}
                    <rect
                        x="250"
                        y="150"
                        width="300"
                        height="200"
                        className={`component ${isComponentActive('client') ? 'active' : ''}`}
                        fill="#10B981"
                        rx="8"
                    />
                    <text x="400" y="180" className="component-text" textAnchor="middle">
                        HTTP Client
                    </text>

                    {/* Request Interceptors */}
                    <rect
                        x="270"
                        y="200"
                        width="120"
                        height="50"
                        className={`component ${isComponentActive('request-interceptors') ? 'active' : ''}`}
                        fill="#8B5CF6"
                        rx="4"
                    />
                    <text x="330" y="230" className="component-text small" textAnchor="middle">
                        Request Int.
                    </text>

                    {/* Response Interceptors */}
                    <rect
                        x="410"
                        y="200"
                        width="120"
                        height="50"
                        className={`component ${isComponentActive('response-interceptors') ? 'active' : ''}`}
                        fill="#8B5CF6"
                        rx="4"
                    />
                    <text x="470" y="230" className="component-text small" textAnchor="middle">
                        Response Int.
                    </text>

                    {/* Cache */}
                    <rect
                        x="270"
                        y="270"
                        width="120"
                        height="50"
                        className={`component ${isComponentActive('cache') ? 'active' : ''}`}
                        fill="#F59E0B"
                        rx="4"
                    />
                    <text x="330" y="300" className="component-text small" textAnchor="middle">
                        Cache
                    </text>

                    {/* Retry Logic */}
                    <rect
                        x="410"
                        y="270"
                        width="120"
                        height="50"
                        className={`component ${isComponentActive('retry') ? 'active' : ''}`}
                        fill="#EF4444"
                        rx="4"
                    />
                    <text x="470" y="300" className="component-text small" textAnchor="middle">
                        Retry Logic
                    </text>

                    {/* Fetch API */}
                    <rect
                        x="350"
                        y="380"
                        width="100"
                        height="60"
                        className={`component ${isComponentActive('fetch') ? 'active' : ''}`}
                        fill="#6366F1"
                        rx="4"
                    />
                    <text x="400" y="415" className="component-text small" textAnchor="middle">
                        Fetch API
                    </text>

                    {/* Server */}
                    <rect
                        x="630"
                        y="50"
                        width="120"
                        height="80"
                        className={`component ${isComponentActive('server') ? 'active' : ''}`}
                        fill="#EC4899"
                        rx="8"
                    />
                    <text x="690" y="95" className="component-text" textAnchor="middle">
                        Server
                    </text>

                    {/* Animated connections */}
                    {isComponentActive('app') && isComponentActive('client') && (
                        <line x1="170" y1="90" x2="250" y2="250" className="connection active" />
                    )}

                    {isComponentActive('client') && isComponentActive('server') && (
                        <line x1="550" y1="250" x2="630" y2="90" className="connection active" />
                    )}

                    {isComponentActive('client') && isComponentActive('fetch') && (
                        <line x1="400" y1="350" x2="400" y2="380" className="connection active" />
                    )}
                </svg>
            </div>

            <div className="controls">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="play-button"
                >
                    {isPlaying ? 'Pause' : 'Play'} Animation
                </button>

                <div className="step-indicator">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`step ${index === currentStep ? 'active' : ''}`}
                            onClick={() => setCurrentStep(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="step-info">
                <h3>{steps[currentStep].title}</h3>
                <p>{steps[currentStep].description}</p>
            </div>

            <div className="features">
                <h2>Key Features</h2>
                <div className="feature-grid">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className={`feature-card ${selectedFeature?.id === feature.id ? 'selected' : ''}`}
                            onClick={() => setSelectedFeature(feature)}
                        >
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>

                {selectedFeature && (
                    <div className="feature-detail">
                        <h3>{selectedFeature.title}</h3>
                        <p>{selectedFeature.description}</p>
                        <pre className="code-block">
                            <code>{selectedFeature.code}</code>
                        </pre>
                    </div>
                )}
            </div>

            <style jsx>{`
        .animation-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .architecture-diagram {
            background: #F9FAFB;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .diagram-svg {
            width: 100%;
            height: auto;
        }
        
        .component {
            opacity: 0.3;
            transition: all 0.5s ease;
            cursor: pointer;
        }
        
        .component.active {
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
        }
        
        .component-text {
            fill: white;
            font-size: 16px;
            font-weight: bold;
            pointer-events: none;
        }
        
        .component-text.small {
            font-size: 14px;
        }
        
        .connection {
            stroke: #6B7280;
            stroke-width: 2;
            fill: none;
            opacity: 0.3;
            transition: all 0.5s ease;
        }
        
        .connection.active {
            opacity: 1;
            stroke: #3B82F6;
            stroke-width: 3;
            stroke-dasharray: 5, 5;
            animation: dash 1s infinite linear;
        }
        
        @keyframes dash {
            to {
            stroke-dashoffset: -10;
            }
        }
        
        .controls {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .play-button {
            background: #3B82F6;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            transition: background 0.2s;
        }
        
        .play-button:hover {
            background: #2563EB;
        }
        
        .step-indicator {
            display: flex;
            gap: 10px;
        }
        
        .step {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #E5E7EB;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .step.active {
            background: #3B82F6;
            transform: scale(1.2);
        }
        
        .step-info {
            background: white;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
        }
        
        .step-info h3 {
            margin: 0 0 10px 0;
            color: #1F2937;
        }
        
        .step-info p {
            margin: 0;
            color: #6B7280;
        }
        
        .features {
            margin-top: 40px;
        }
        
        .features h2 {
            margin-bottom: 20px;
            color: #1F2937;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .feature-card {
            background: white;
            border: 2px solid #E5E7EB;
            border-radius: 8px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            border-color: #3B82F6;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .feature-card.selected {
            border-color: #3B82F6;
            background: #EFF6FF;
        }
        
        .feature-card h4 {
            margin: 0 0 10px 0;
            color: #1F2937;
        }
        
        .feature-card p {
            margin: 0;
            color: #6B7280;
            font-size: 14px;
        }
        
        .feature-detail {
            background: white;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 30px;
            margin-top: 20px;
        }
        
        .feature-detail h3 {
            margin: 0 0 10px 0;
            color: #1F2937;
        }
        
        .feature-detail p {
            color: #6B7280;
            margin-bottom: 20px;
        }
        
        .code-block {
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 6px;
            padding: 20px;
            overflow-x: auto;
            margin: 0;
        }
        
        .code-block code {
            font-family: 'Menlo', 'Monaco', 'Consolas', monospace;
            font-size: 14px;
            line-height: 1.5;
            color: #1F2937;
        }
        `}</style>
    </div>
);
}

export default HttpClientAnimation;