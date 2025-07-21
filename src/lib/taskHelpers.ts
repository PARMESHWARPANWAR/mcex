import { ITask } from '@/types';

export const isCompletedToday = (task: ITask): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return task.completedDates?.some(date => {
    const completedDate = new Date(date);
    completedDate.setHours(0, 0, 0, 0);
    return completedDate.getTime() === today.getTime();
  }) || false;
};

export const formatDate = (date: Date | null): string => {
  if (!date) return 'Never';
  return new Date(date).toLocaleDateString();
};

export const calculateStreakData = (completedDates: Date[], lastCompletionDate: Date | null) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let streakCurrent = 0;

  if (!lastCompletionDate) {
    // First completion
    streakCurrent = 1;
  } else {
    const lastCompleted = new Date(lastCompletionDate);
    lastCompleted.setHours(0, 0, 0, 0);
    
    if (lastCompleted.getTime() === yesterday.getTime()) {
      // Consecutive day - streak continues
      const sortedDates = completedDates
        .map(date => new Date(date))
        .sort((a, b) => b.getTime() - a.getTime());
      
      streakCurrent = calculateCurrentStreak(sortedDates, today);
    } else {
      // Streak broken, restart
      streakCurrent = 1;
    }
  }

  return { streakCurrent };
};

const calculateCurrentStreak = (sortedDates: Date[], today: Date): number => {
  let streak = 1; // Including today
  let currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() - 1); // Start from yesterday
  
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const date = new Date(sortedDates[i]);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === currentDate.getTime()) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};