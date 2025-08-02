'use client';

import React, { useState, useMemo } from 'react';
import { ITask } from '@/types';
import { CalendarDay, DayStatus } from '@/types/calendar';

interface StreakCalendarProps {
  task: ITask;
  onDateSelect?: (date: Date) => void;
  showMonthNavigation?: boolean;
}

const StreakCalendar: React.FC<StreakCalendarProps> = ({ 
  task, 
  onDateSelect,
  showMonthNavigation = true 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar data for the month
  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and how many days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get first day of week (Sunday = 0)
    const startingDayOfWeek = firstDay.getDay();
    
    // Create calendar grid
    const calendar: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const taskCreatedDate = new Date(task.createdAt);
    taskCreatedDate.setHours(0, 0, 0, 0);
    
    // Add empty cells for previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const date = new Date(year, month, -startingDayOfWeek + i + 1);
      calendar.push({
        date,
        status: DayStatus.NOT_STARTED,
        isPremium: false
      });
    }
    
    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      date.setHours(0, 0, 0, 0);
      
      const status = getDayStatus(date, task, taskCreatedDate, today);
      const isPremium = isPremiumCompletion(date, task);
      const streakDay = getStreakDay(date, task);
      
      calendar.push({
        date,
        status,
        isPremium,
        streakDay
      });
    }
    
    return calendar;
  }, [currentMonth, task]);

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Handle date click
  const handleDateClick = (calendarDay: CalendarDay) => {
    if (onDateSelect) {
      onDateSelect(calendarDay.date);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {task.title} - Progress Calendar
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Track your daily progress and streaks
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex space-x-4 text-xs">
          <LegendItem color="bg-green-500" label="Completed" />
          <LegendItem color="bg-amber-500" label="Pending" />
          <LegendItem color="bg-red-500" label="Missed" />
          <LegendItem color="bg-purple-500" label="Premium" />
        </div>
      </div>

      {/* Month Navigation */}
      {showMonthNavigation && (
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          
          <h4 className="text-lg font-semibold text-gray-800">
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h4>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarData.map((calendarDay, index) => (
          <CalendarDayCell
            key={index}
            calendarDay={calendarDay}
            onClick={() => handleDateClick(calendarDay)}
            isToday={isToday(calendarDay.date)}
            isCurrentMonth={calendarDay.date.getMonth() === currentMonth.getMonth()}
          />
        ))}
      </div>

      {/* Stats Summary */}
      <StreakStats task={task} currentMonth={currentMonth} />
    </div>
  );
};

// Calendar Day Cell Component
interface CalendarDayCellProps {
  calendarDay: CalendarDay;
  onClick: () => void;
  isToday: boolean;
  isCurrentMonth: boolean;
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({
  calendarDay,
  onClick,
  isToday,
  isCurrentMonth
}) => {
  const { date, status, isPremium, streakDay } = calendarDay;
  
  const baseClasses = "relative h-10 w-10 rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer transition-all duration-200 hover:scale-105";
  
  const getStatusClasses = () => {
    const opacity = isCurrentMonth ? '' : 'opacity-30';
    
    switch (status) {
      case DayStatus.COMPLETED:
        return `${baseClasses} ${isPremium ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-green-500 text-white'} ${opacity}`;
      case DayStatus.PENDING:
        return `${baseClasses} bg-amber-500 text-white ${opacity}`;
      case DayStatus.MISSED:
        return `${baseClasses} bg-red-500 text-white ${opacity}`;
      case DayStatus.FUTURE:
        return `${baseClasses} bg-gray-100 text-gray-400 ${opacity}`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-300 ${opacity}`;
    }
  };

  return (
    <div className="relative">
      <div
        className={`${getStatusClasses()} ${isToday ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
        onClick={onClick}
      >
        {date.getDate()}
        
        {/* Premium indicator */}
        {isPremium && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center">
            <StarIcon className="w-2 h-2 text-yellow-800" />
          </div>
        )}
        
        {/* Streak day indicator */}
        {streakDay && status === DayStatus.COMPLETED && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
            {streakDay}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
const getDayStatus = (
  date: Date, 
  task: ITask, 
  taskCreatedDate: Date, 
  today: Date
): DayStatus => {
  // Future dates
  if (date > today) {
    return DayStatus.FUTURE;
  }
  
  // Before task was created
  if (date < taskCreatedDate) {
    return DayStatus.NOT_STARTED;
  }
  
  // Check if completed on this date
  const isCompleted = task.completedDates.some(completedDate => {
    const completed = new Date(completedDate);
    completed.setHours(0, 0, 0, 0);
    return completed.getTime() === date.getTime();
  });
  
  if (isCompleted) {
    return DayStatus.COMPLETED;
  }
  
  // If it's today and not completed
  if (date.getTime() === today.getTime()) {
    return DayStatus.PENDING;
  }
  
  // Past date that should have been completed but wasn't
  return DayStatus.MISSED;
};

const isPremiumCompletion = (date: Date, task: ITask): boolean => {
  // Logic for premium completions (e.g., completed early, bonus achievements, etc.)
  // This could be based on time of completion, consecutive days, milestones, etc.
  
  // Example: Mark as premium if it's part of a streak of 7+ days
  const completedDate = task.completedDates.find(d => {
    const completed = new Date(d);
    completed.setHours(0, 0, 0, 0);
    return completed.getTime() === date.getTime();
  });
  
  if (!completedDate) return false;
  
  // Simple premium logic: every 7th day in a streak
  const streakDay = getStreakDay(date, task);
  return streakDay !== null && streakDay % 7 === 0;
};

const getStreakDay = (date: Date, task: ITask): number | null => {
  const completedDates = task.completedDates
    .map(d => {
      const date = new Date(d);
      date.setHours(0, 0, 0, 0);
      return date;
    })
    .sort((a, b) => a.getTime() - b.getTime());
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  // Find if this date was completed
  const dateIndex = completedDates.findIndex(d => d.getTime() === targetDate.getTime());
  if (dateIndex === -1) return null;
  
  // Calculate which day of the current streak this was
  let streakDay = 1;
  for (let i = dateIndex - 1; i >= 0; i--) {
    const currentDate = completedDates[i];
    const nextDate = completedDates[i + 1];
    const dayDiff = Math.floor((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 1) {
      streakDay++;
    } else {
      break;
    }
  }
  
  return streakDay;
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return today.getTime() === checkDate.getTime();
};

// Streak Stats Component
interface StreakStatsProps {
  task: ITask;
  currentMonth: Date;
}

const StreakStats: React.FC<StreakStatsProps> = ({ task, currentMonth }) => {
  const monthStats = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const monthCompletions = task.completedDates.filter(date => {
      const completedDate = new Date(date);
      return completedDate >= firstDay && completedDate <= lastDay;
    });
    
    const today = new Date();
    const daysPassedThisMonth = today.getMonth() === month && today.getFullYear() === year
      ? today.getDate()
      : lastDay.getDate();
    
    const completionRate = daysPassedThisMonth > 0 
      ? Math.round((monthCompletions.length / daysPassedThisMonth) * 100)
      : 0;
    
    return {
      completions: monthCompletions.length,
      totalDays: lastDay.getDate(),
      daysPassedThisMonth,
      completionRate,
      perfectDays: monthCompletions.length // Could be enhanced with premium logic
    };
  }, [task, currentMonth]);

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Completed"
          value={monthStats.completions}
          color="text-green-600"
          icon="✅"
        />
        <StatCard
          label="Completion Rate"
          value={`${monthStats.completionRate}%`}
          color="text-blue-600"
          icon="📊"
        />
        <StatCard
          label="Current Streak"
          value={task.streakCurrent}
          color="text-purple-600"
          icon="🔥"
        />
        <StatCard
          label="Best Streak"
          value={task.streakMax}
          color="text-orange-600"
          icon="🏆"
        />
      </div>
    </div>
  );
};

// Helper Components
const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center space-x-1">
    <div className={`w-3 h-3 rounded-full ${color}`} />
    <span>{label}</span>
  </div>
);

const StatCard: React.FC<{ label: string; value: string | number; color: string; icon: string }> = ({ 
  label, value, color, icon 
}) => (
  <div className="text-center">
    <div className="text-2xl mb-1">{icon}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

// Icon Components
const ChevronLeftIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const StarIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default StreakCalendar;

