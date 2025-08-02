'use client';

import React from 'react';
import { ITask } from '@/types';
import StreakCalendar from '@/components/streak/StreakCalendar';
import { LegendItem } from './TaskEditForm';

interface CalendarViewProps {
  task: ITask;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ task }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Progress Calendar</h3>
        <p className="text-gray-600">
          Visual overview of your daily progress and streak patterns
        </p>
      </div>
      
      <StreakCalendar task={task} showMonthNavigation={true} />
      
      {/* Calendar Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Calendar Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <LegendItem color="bg-green-500" label="Completed" />
          <LegendItem color="bg-amber-500" label="Today (Pending)" />
          <LegendItem color="bg-red-500" label="Missed" />
          <LegendItem color="bg-gray-300" label="Future" />
        </div>
      </div>
    </div>
  );
};
