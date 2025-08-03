import { ITask, MoodType } from "./streak";
export interface ITaskStep {
  _id: string;
  stepNumber: number;
  title: string;
  description?: string;
  isRequired: boolean;
  estimatedMinutes?: number;
  icon?: string;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface IPremiumTaskFeatures {
  hasSteps: boolean;
  steps?: ITaskStep[];
  stepProgress?: {
    completed: number;
    total: number;
    percentage: number;
  };
  
  // Premium features
  hasReminders: boolean;
  reminderTimes?: string[]; // ["09:00", "15:00", "21:00"]
  
  hasTimeTracking: boolean;
  estimatedDuration?: number; // minutes
  actualDuration?: number; // minutes tracked
  
  hasSubgoals: boolean;
  weeklyTarget?: number;
  monthlyTarget?: number;
  
  hasRewards: boolean;
  rewardPoints?: number;
  badges?: IBadge[];
  
  hasNotes: boolean;
  dailyNotes?: IDailyNote[];
  
  hasCategories: boolean;
  category?: TaskCategory;
  
  hasDifficulty: boolean;
  difficulty?: DifficultyLevel;
  
  hasCollaborative: boolean;
  collaborators?: string[];
  
  hasTemplates: boolean;
  templateId?: string;
}

export interface IEnhancedTask extends ITask {
  isPremium: boolean;
  premiumFeatures: IPremiumTaskFeatures;
  subscription?: {
    tier: 'basic' | 'premium' | 'pro';
    expiresAt: Date;
  };
}

export interface IBadge {
  _id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
  condition: string; // e.g., "Complete 7 days in a row"
}

export interface IDailyNote {
  _id: string;
  taskId: string;
  date: Date;
  note: string;
  mood: MoodType;
  energy: EnergyLevel;
  satisfaction: number; // 1-5 rating
  createdAt: Date;
}

export enum TaskCategory {
  HEALTH = 'health',
  FITNESS = 'fitness',
  LEARNING = 'learning',
  WORK = 'work',
  PERSONAL = 'personal',
  SOCIAL = 'social',
  CREATIVITY = 'creativity',
  MINDFULNESS = 'mindfulness'
}

export enum EnergyLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert'
}

// Predefined step templates
export const STEP_TEMPLATES = {
  WATER_INTAKE: {
    name: "Daily Water Intake",
    icon: "💧",
    steps: [
      { title: "Morning glass (250ml)", icon: "🌅", estimatedMinutes: 1 },
      { title: "Pre-breakfast (250ml)", icon: "🥣", estimatedMinutes: 1 },
      { title: "Mid-morning (250ml)", icon: "☀️", estimatedMinutes: 1 },
      { title: "Pre-lunch (250ml)", icon: "🍽️", estimatedMinutes: 1 },
      { title: "Afternoon (250ml)", icon: "🌤️", estimatedMinutes: 1 },
      { title: "Pre-dinner (250ml)", icon: "🍽️", estimatedMinutes: 1 },
      { title: "Evening (250ml)", icon: "🌆", estimatedMinutes: 1 },
      { title: "Before bed (250ml)", icon: "🌙", estimatedMinutes: 1 }
    ]
  },
  
  WORKOUT: {
    name: "Daily Workout",
    icon: "💪",
    steps: [
      { title: "5min Warm-up", icon: "🔥", estimatedMinutes: 5 },
      { title: "15min Cardio", icon: "🏃", estimatedMinutes: 15 },
      { title: "20min Strength Training", icon: "🏋️", estimatedMinutes: 20 },
      { title: "10min Core Workout", icon: "💪", estimatedMinutes: 10 },
      { title: "5min Cool-down & Stretch", icon: "🧘", estimatedMinutes: 5 }
    ]
  },
  
  READING: {
    name: "Daily Reading",
    icon: "📚",
    steps: [
      { title: "Choose book/article", icon: "📖", estimatedMinutes: 2 },
      { title: "Read 10 pages", icon: "📄", estimatedMinutes: 15 },
      { title: "Take notes", icon: "✍️", estimatedMinutes: 5 },
      { title: "Reflect on content", icon: "💭", estimatedMinutes: 3 }
    ]
  },
  
  MEDITATION: {
    name: "Daily Meditation",
    icon: "🧘",
    steps: [
      { title: "Find quiet space", icon: "🏠", estimatedMinutes: 1 },
      { title: "5min breathing exercise", icon: "🫁", estimatedMinutes: 5 },
      { title: "10min mindfulness", icon: "🧠", estimatedMinutes: 10 },
      { title: "5min gratitude reflection", icon: "🙏", estimatedMinutes: 5 }
    ]
  },
  
  LEARNING: {
    name: "Daily Learning",
    icon: "🎓",
    steps: [
      { title: "Review yesterday's notes", icon: "📝", estimatedMinutes: 5 },
      { title: "Watch tutorial/lesson", icon: "📺", estimatedMinutes: 20 },
      { title: "Practice exercises", icon: "💻", estimatedMinutes: 15 },
      { title: "Test knowledge", icon: "🧪", estimatedMinutes: 10 }
    ]
  }
};

