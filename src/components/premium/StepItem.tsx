'use client';

import React from 'react';
import { ITaskStep } from '@/types/premium';

interface StepItemProps {
  step: ITaskStep;
  onComplete: () => void;
  isProcessing: boolean;
}

export const StepItem: React.FC<StepItemProps> = ({ step, onComplete, isProcessing }) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 ${
      step.isCompleted 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      <div className="flex items-center space-x-3 flex-1">
        <div className="text-2xl">{step.icon || '•'}</div>
        
        <div className="flex-1">
          <h4 className={`font-medium ${
            step.isCompleted ? 'text-green-800 line-through' : 'text-gray-800'
          }`}>
            {step.title}
          </h4>
          
          {step.description && (
            <p className="text-sm text-gray-600">{step.description}</p>
          )}
          
          {step.estimatedMinutes && (
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block mt-1">
              ~{step.estimatedMinutes} min
            </span>
          )}
        </div>
      </div>
      
      <button
        onClick={onComplete}
        disabled={step.isCompleted || isProcessing}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          step.isCompleted
            ? 'bg-green-500 text-white cursor-not-allowed'
            : isProcessing
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
        }`}
      >
        {step.isCompleted ? (
          <CheckIcon className="w-4 h-4" />
        ) : isProcessing ? (
          <LoadingIcon className="w-4 h-4" />
        ) : (
          <span className="text-sm font-bold">✓</span>
        )}
      </button>
    </div>
  );
};

const CheckIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const LoadingIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={`${className} animate-spin`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);
