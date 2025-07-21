import mongoose, { Schema } from 'mongoose';
import { ITaskDocument } from '@/types';

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedDates: [{
    type: Date,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
});

// Add indexes for better performance
TaskSchema.index({ userId: 1, createdAt: -1 });
TaskSchema.index({ userId: 1, streakCurrent: -1 });

export default mongoose.models.Task || mongoose.model<ITaskDocument>('Task', TaskSchema);
