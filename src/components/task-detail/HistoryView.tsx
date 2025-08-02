'use client';

import React, { useState } from 'react';
import { ITask } from '@/types';
import { HistoryItem } from './TaskEditForm';

interface HistoryViewProps {
  task: ITask;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ task }) => {
  const [filter, setFilter] = useState<'all' | 'recent' | 'month'>('recent');
  
  const getFilteredDates = () => {
    const dates = task.completedDates || [];
    const now = new Date();
    
    switch (filter) {
      case 'recent':
        return dates
          .slice(-30) // Last 30 completions
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      case 'month':
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        return dates
          .filter(date => {
            const d = new Date(date);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
          })
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      default:
        return dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    }
  };

  const filteredDates = getFilteredDates();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Completion History</h3>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {[
            { key: 'recent', label: 'Recent' },
            { key: 'month', label: 'This Month' },
            { key: 'all', label: 'All Time' },
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === filterOption.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {filteredDates.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📅</div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">No completions found</h4>
          <p className="text-gray-500">Complete your first task to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDates.map((date, index) => (
            <HistoryItem 
              key={index}
              date={date}
              dayNumber={filteredDates.length - index}
            />
          ))}
        </div>
      )}
    </div>
  );
};
