import mongoose, { Schema } from 'mongoose';
import { IStreakEntryDocument, CompletionStatus, MoodType, EffortLevel } from '@/types';

const StreakEntrySchema: Schema<IStreakEntryDocument> = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: [true, 'Task ID is required'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  completedAt: {
    type: Date,
    required: [true, 'Completion time is required'],
  },
  status: {
    type: String,
    enum: Object.values(CompletionStatus),
    default: CompletionStatus.COMPLETED,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  streakDayNumber: {
    type: Number,
    required: [true, 'Streak day number is required'],
    min: [1, 'Streak day must be at least 1'],
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
  },
  mood: {
    type: String,
    enum: Object.values(MoodType),
  },
  effort: {
    type: String,
    enum: Object.values(EffortLevel),
  },
}, {
  timestamps: true,
});

// Indexes for performance
StreakEntrySchema.index({ taskId: 1, date: 1 }, { unique: true });
StreakEntrySchema.index({ userId: 1, date: -1 });
StreakEntrySchema.index({ taskId: 1, createdAt: -1 });

export default mongoose.models.StreakEntry || mongoose.model<IStreakEntryDocument>('StreakEntry', StreakEntrySchema);
