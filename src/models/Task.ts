import mongoose, { Schema } from 'mongoose';
import { ITaskDocument, DifficultyLevel, FrequencyType } from '@/types';

const TaskSchema: Schema<ITaskDocument> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters'],
  },
  difficulty: {
    type: String,
    enum: Object.values(DifficultyLevel),
    default: DifficultyLevel.MEDIUM,
  },
  targetFrequency: {
    type: String,
    enum: Object.values(FrequencyType),
    default: FrequencyType.DAILY,
  },
  reminderTime: {
    type: String, // Format: "HH:MM"
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  streakCurrent: {
    type: Number,
    default: 0,
    min: [0, 'Current streak cannot be negative'],
  },
  streakMax: {
    type: Number,
    default: 0,
    min: [0, 'Max streak cannot be negative'],
  },
  streakLast: {
    type: Date,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
}, {
  timestamps: true,
});

// Virtual for streak entries
TaskSchema.virtual('streakEntries', {
  ref: 'StreakEntry',
  localField: '_id',
  foreignField: 'taskId',
});

// Add indexes
TaskSchema.index({ userId: 1, createdAt: -1 });
TaskSchema.index({ userId: 1, isActive: 1 });
TaskSchema.index({ userId: 1, category: 1 });

export default mongoose.models.Task || mongoose.model<ITaskDocument>('Task', TaskSchema);
