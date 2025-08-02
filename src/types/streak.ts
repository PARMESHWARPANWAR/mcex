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


export interface IStreakEntry {
  _id: string;
  taskId: string;
  userId: string;
  date: Date;
  completedAt: Date;
  status: CompletionStatus;
  isPremium: boolean;
  streakDayNumber: number; // Which day of the streak this was (1, 2, 3, etc.)
  notes?: string;
  mood?: MoodType;
  effort?: EffortLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStreakEntryDocument extends Document {
  taskId: string;
  userId: string;
  date: Date;
  completedAt: Date;
  status: CompletionStatus;
  isPremium: boolean;
  streakDayNumber: number;
  notes?: string;
  mood?: MoodType;
  effort?: EffortLevel;
  createdAt: Date;
  updatedAt: Date;
}

export enum CompletionStatus {
  COMPLETED = 'completed',
  PARTIAL = 'partial',
  SKIPPED = 'skipped',
  MISSED = 'missed'
}

export enum MoodType {
  GREAT = 'great',
  GOOD = 'good',
  OKAY = 'okay',
  POOR = 'poor'
}

export enum EffortLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Updated Task interface with enhanced tracking
export interface ITaskEnhanced extends ITask {
  category?: string;
  difficulty?: DifficultyLevel;
  targetFrequency?: FrequencyType;
  reminderTime?: string;
  isActive: boolean;
  tags?: string[];
  streakEntries?: IStreakEntry[];
  analytics?: TaskAnalytics;
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum FrequencyType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  WEEKDAYS = 'weekdays',
  CUSTOM = 'custom'
}

export interface TaskAnalytics {
  totalCompletions: number;
  averageStreakLength: number;
  longestStreak: number;
  completionRate: number;
  bestMonth: string;
  consistencyScore: number;
  premiumCompletions: number;
}