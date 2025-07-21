import { Document } from 'mongoose';

export interface ITask {
  _id: string;
  title: string;
  description: string;
  streakCurrent: number;
  streakMax: number;
  streakLast: Date | null;
  createdAt: Date;
  completedDates: Date[];
}

export interface ITaskDocument extends Document {
  title: string;
  description: string;
  streakCurrent: number;
  streakMax: number;
  streakLast: Date | null;
  createdAt: Date;
  completedDates: Date[];
}

export interface CreateTaskData {
  title: string;
  description: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface TaskCardProps {
  task: ITask;
  onComplete: (taskId: string) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

export interface AddTaskFormProps {
  onAdd: (taskData: CreateTaskData) => Promise<void>;
}
