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
});

// Add indexes for better performance
TaskSchema.index({ createdAt: -1 });
TaskSchema.index({ streakCurrent: -1 });

export default mongoose.models.Task || mongoose.model<ITaskDocument>('Task', TaskSchema);
