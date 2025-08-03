import mongoose, { Schema } from 'mongoose';
import { TaskCategory, DifficultyLevel } from '@/types/premium';
import { ITaskDocument } from '@/types';

const TaskStepSchema = new Schema({
  stepNumber: { type: Number, required: true },
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 200 },
  isRequired: { type: Boolean, default: true },
  estimatedMinutes: { type: Number, min: 1, max: 1440 },
  icon: { type: String, maxlength: 10 },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date }
});

const DailyNoteSchema = new Schema({
  date: { type: Date, required: true },
  note: { type: String, maxlength: 1000 },
  mood: { type: String, enum: ['great', 'good', 'okay', 'poor'] },
  energy: { type: String, enum: ['low', 'medium', 'high'] },
  satisfaction: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

const BadgeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'], default: 'common' },
  earnedAt: { type: Date, default: Date.now },
  condition: { type: String, required: true }
});

const EnhancedTaskSchema: Schema<ITaskDocument> = new mongoose.Schema({
  // Basic task fields
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, required: true, trim: true, maxlength: 500 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Premium features
  isPremium: { type: Boolean, default: false },
  
  // Step-based completion
  hasSteps: { type: Boolean, default: false },
  steps: [TaskStepSchema],
  stepProgress: {
    completed: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 }
  },
  
  // Time tracking
  hasTimeTracking: { type: Boolean, default: false },
  estimatedDuration: { type: Number }, // minutes
  actualDuration: { type: Number }, // minutes
  
  // Reminders
  hasReminders: { type: Boolean, default: false },
  reminderTimes: [{ type: String }], // ["09:00", "15:00"]
  
  // Goals and targets
  hasSubgoals: { type: Boolean, default: false },
  weeklyTarget: { type: Number },
  monthlyTarget: { type: Number },
  
  // Gamification
  hasRewards: { type: Boolean, default: false },
  rewardPoints: { type: Number, default: 0 },
  badges: [BadgeSchema],
  
  // Notes and reflection
  hasNotes: { type: Boolean, default: false },
  dailyNotes: [DailyNoteSchema],
  
  // Categorization
  hasCategories: { type: Boolean, default: false },
  category: { type: String, enum: Object.values(TaskCategory) },
  
  // Difficulty
  hasDifficulty: { type: Boolean, default: false },
  difficulty: { type: String, enum: Object.values(DifficultyLevel), default: DifficultyLevel.MEDIUM },
  
  // Collaboration
  hasCollaborative: { type: Boolean, default: false },
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // Templates
  hasTemplates: { type: Boolean, default: false },
  templateId: { type: String },
  
  // Basic streak info (kept for compatibility)
  streakCurrent: { type: Number, default: 0 },
  streakMax: { type: Number, default: 0 },
  streakLast: { type: Date },
  completedDates: [{ type: Date }],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Indexes
EnhancedTaskSchema.index({ userId: 1, createdAt: -1 });
EnhancedTaskSchema.index({ userId: 1, category: 1 });
EnhancedTaskSchema.index({ userId: 1, isPremium: 1 });

export default mongoose.models.EnhancedTask || mongoose.model('EnhancedTask', EnhancedTaskSchema);