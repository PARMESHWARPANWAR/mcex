import { ITask } from "./streak";

export interface CalendarDay {
  date: Date;
  status: DayStatus;
  isPremium?: boolean;
  streakDay?: number; // Which day of the streak this was
}

export enum DayStatus {
  NOT_STARTED = 'not_started',    // Gray - Task not created yet
  PENDING = 'pending',            // Orange - Task exists but not completed
  COMPLETED = 'completed',        // Green - Completed
  MISSED = 'missed',              // Red - Should have been done but missed
  FUTURE = 'future'               // Light gray - Future dates
}

export interface StreakCalendarProps {
  task: ITask;
  onDateSelect?: (date: Date) => void;
  showMonthNavigation?: boolean;
  highlightToday?: boolean;
}
