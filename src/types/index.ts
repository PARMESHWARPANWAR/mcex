import { Document } from 'mongoose';


export interface IUser {
  _id: string;
  email: string;
  username: string;
  password?: string; // Optional for client-side
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  streakCurrent: number;
  streakMax: number;
  streakLast: Date | null;
  createdAt: Date;
  completedDates: Date[];
  userId: string; // Reference to user
}

export interface ITaskDocument extends Document {
  title: string;
  description: string;
  streakCurrent: number;
  streakMax: number;
  streakLast: Date | null;
  createdAt: Date;
  completedDates: Date[];
  userId: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
}

export interface CreateUserData {
  email: string;
  username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: IUser;
  token?: string;
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
