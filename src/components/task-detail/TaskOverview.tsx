'use client';

import React, { useState } from 'react';
import { ITask } from '@/types';
import { isCompletedToday, formatDate } from '@/lib/taskHelpers';
import { RecentActivityList } from './TaskEditForm';

interface TaskOverviewProps {
  task: ITask;
  onComplete: () => Promise<void>;
  onRefresh: () => Promise<void>;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ task, onComplete, onRefresh }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const completedToday = isCompletedToday(task);

  const handleComplete = async () => {
    if (isCompleting || completedToday) return;
    
    setIsCompleting(true);
    try {
      await onComplete();
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Today's Action Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Progress</h3>
        
        <div className="text-center py-8">
          <div className="text-6xl mb-4">
            {completedToday ? '✅' : '⏳'}
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {completedToday ? 'Completed Today!' : 'Ready to Complete?'}
          </h4>
          <p className="text-gray-600 mb-6">
            {completedToday 
              ? 'Great job! You\'ve completed this task today.' 
              : 'Complete your daily task to continue your streak.'
            }
          </p>
          
          <button
            onClick={handleComplete}
            disabled={isCompleting || completedToday}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
              completedToday
                ? 'bg-green-100 text-green-800 cursor-not-allowed'
                : isCompleting
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            {completedToday ? 'Completed Today' : isCompleting ? 'Completing...' : 'Mark as Complete'}
          </button>
        </div>
      </div>

      {/* Streak Information */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Streak Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Current Streak</span>
            <span className="text-2xl font-bold text-orange-600">{task.streakCurrent} days</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Best Streak</span>
            <span className="text-2xl font-bold text-yellow-600">{task.streakMax} days</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">Last Completed</span>
            <span className="text-lg font-semibold text-purple-600">{formatDate(task.streakLast)}</span>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600">Task Created</span>
            <span className="text-lg font-semibold text-blue-600">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <RecentActivityList task={task} />
      </div>
    </div>
  );
};

export default TaskOverview;