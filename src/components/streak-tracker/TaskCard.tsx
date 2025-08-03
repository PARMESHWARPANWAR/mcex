'use client';

import React, { useState } from 'react';
import { TaskCardProps } from '@/types';
import { isCompletedToday, formatDate } from '@/lib/taskHelpers';
import { useRouter } from 'next/navigation';

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onDelete }) => {
  const [isCompleting, setIsCompleting] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleComplete = async (): Promise<void> => {
    if (isCompleting || completedToday) return;
    
    setIsCompleting(true);
    try {
      await onComplete(task._id);
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (isDeleting) return;
    
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
      setIsDeleting(false);
    }
  };

  const handleViewDetails = (): void => {
    router.push(`/streak-tracker/tasks/${task._id}`);
  };

  const completedToday = isCompletedToday(task);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 p-6 transition-all duration-300 hover:-translate-y-1 animate-slide-in">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight line-clamp-2">
            {task.title}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {task.description.slice(0,20)}...
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          {/* View Details button */}
          <button
            onClick={handleViewDetails}
            className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition-all duration-200"
            title="View details"
            type="button"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          
          {/* Delete button */}
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-2 rounded-full transition-all duration-200 ${
              isDeleting
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            title="Delete task"
            type="button"
          >
            {isDeleting ? (
              <LoadingIcon className="w-5 h-5" />
            ) : (
              <TrashIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {/* Current Streak */}
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {task.streakCurrent}
          </div>
          <div className="text-xs sm:text-sm font-medium text-blue-700 mt-1">
            Current
          </div>
        </div>

        {/* Max Streak */}
        <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {task.streakMax}
          </div>
          <div className="text-xs sm:text-sm font-medium text-green-700 mt-1">
            Best
          </div>
        </div>

        {/* Last Completed */}
        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
          <div className="text-xs sm:text-sm font-bold text-purple-700 leading-tight">
            {formatDate(task.streakLast)}
          </div>
          <div className="text-xs font-medium text-purple-600 mt-1">
            Last
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={isCompleting || completedToday}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          completedToday
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 cursor-not-allowed border border-green-200 focus:ring-green-500'
            : isCompleting
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus:ring-blue-500'
        }`}
        type="button"
      >
        {completedToday ? (
          <span className="flex items-center justify-center">
            <CheckIcon className="w-5 h-5 mr-2" />
            Completed Today
          </span>
        ) : isCompleting ? (
          <span className="flex items-center justify-center">
            <LoadingIcon className="w-5 h-5 mr-2" />
            Completing...
          </span>
        ) : (
          'Mark Complete'
        )}
      </button>
    </div>
  );
};

// Icon Components
const EyeIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const TrashIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

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

export default TaskCard;