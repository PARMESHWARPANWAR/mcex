'use client';

import React, { useState } from 'react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
  title?: string;
  showDetails?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  error, 
  onRetry,
  title = "Something went wrong",
  showDetails = false
}) => {
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [showFullError, setShowFullError] = useState<boolean>(false);

  const handleRetry = async (): Promise<void> => {
    if (isRetrying) return;
    
    setIsRetrying(true);
    try {
      await onRetry();
    } catch (retryError) {
      console.error('Retry failed:', retryError);
    } finally {
      // Add a small delay to show the loading state
      setTimeout(() => {
        setIsRetrying(false);
      }, 500);
    }
  };

  const toggleErrorDetails = (): void => {
    setShowFullError(!showFullError);
  };

  // Truncate long error messages
  const displayError = error.length > 100 && !showFullError 
    ? `${error.substring(0, 100)}...` 
    : error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-md w-full">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <svg 
            className="w-8 h-8 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {title}
        </h3>

        {/* Error Message */}
        <div className="mb-6">
          <p className="text-red-600 leading-relaxed">
            {displayError}
          </p>
          
          {/* Show More/Less Button for long errors */}
          {error.length > 100 && (
            <button
              onClick={toggleErrorDetails}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              type="button"
            >
              {showFullError ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Retry Button */}
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isRetrying
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
            }`}
            type="button"
            aria-label={isRetrying ? 'Retrying...' : 'Retry operation'}
          >
            {isRetrying ? (
              <span className="flex items-center justify-center">
                <LoadingSpinner className="w-5 h-5 mr-2" />
                Retrying...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <RefreshIcon className="w-5 h-5 mr-2" />
                Try Again
              </span>
            )}
          </button>

          {/* Additional Help Text */}
          <p className="text-sm text-gray-500">
            If the problem persists, please check your internet connection or contact support.
          </p>
        </div>

        {/* Development Details (only show in development) */}
        {showDetails && process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium">
              Development Details
            </summary>
            <div className="mt-2 p-3 bg-gray-50 rounded-lg border text-xs font-mono text-gray-700 overflow-auto max-h-32">
              {error}
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

// Icon Components
const LoadingSpinner: React.FC<{ className: string }> = ({ className }) => (
  <svg 
    className={`${className} animate-spin`}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const RefreshIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
    />
  </svg>
);

export default ErrorMessage;