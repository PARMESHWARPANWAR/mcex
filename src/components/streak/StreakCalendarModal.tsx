
'use client';

import React from 'react';
import { ITask } from '@/types';
import StreakCalendar from './StreakCalendar';

interface StreakCalendarModalProps {
  task: ITask;
  isOpen: boolean;
  onClose: () => void;
}

const StreakCalendarModal: React.FC<StreakCalendarModalProps> = ({ 
  task, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-[700px] bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Progress Calendar - {task.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <StreakCalendar task={task} />
        </div>
      </div>
    </div>
  );
};

export default StreakCalendarModal;
