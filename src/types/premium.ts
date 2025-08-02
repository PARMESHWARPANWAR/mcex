// types/premium.ts
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

// models/EnhancedTask.ts
import mongoose, { Schema } from 'mongoose';
import { ITaskDocument, TaskCategory, DifficultyLevel } from '@/types';

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

// components/premium/StepBasedTaskCard.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IEnhancedTask, ITaskStep } from '@/types';

interface StepBasedTaskCardProps {
  task: IEnhancedTask;
  onStepComplete: (taskId: string, stepNumber: number) => Promise<void>;
  onTaskComplete: (taskId: string) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

const StepBasedTaskCard: React.FC<StepBasedTaskCardProps> = ({ 
  task, 
  onStepComplete, 
  onTaskComplete,
  onDelete 
}) => {
  const [expandedSteps, setExpandedSteps] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleStepComplete = async (stepNumber: number) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      await onStepComplete(task._id, stepNumber);
      
      // Check if all steps are completed
      const updatedStep = task.premiumFeatures.steps?.find(s => s.stepNumber === stepNumber);
      const allStepsCompleted = task.premiumFeatures.steps?.every(step => 
        step.stepNumber === stepNumber ? true : step.isCompleted
      );
      
      if (allStepsCompleted) {
        await onTaskComplete(task._id);
      }
    } catch (error) {
      console.error('Error completing step:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleViewDetails = () => {
    router.push(`/tasks/${task._id}`);
  };

  const completedSteps = task.premiumFeatures.steps?.filter(step => step.isCompleted).length || 0;
  const totalSteps = task.premiumFeatures.steps?.length || 0;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isCompleted = progressPercentage === 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 p-6 transition-all duration-300 hover:-translate-y-1">
      {/* Premium Badge */}
      {task.isPremium && (
        <div className="flex justify-end mb-2">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
            <StarIcon className="w-3 h-3 mr-1" />
            PREMIUM
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
            {task.premiumFeatures.category && (
              <CategoryBadge category={task.premiumFeatures.category} />
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={handleViewDetails}
            className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition-colors"
            title="View details"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete task"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {completedSteps}/{totalSteps} steps
          </span>
          <span className="text-sm font-bold text-blue-600">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              isCompleted 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Steps Preview/Expanded */}
      {task.premiumFeatures.hasSteps && (
        <div className="mb-4">
          <button
            onClick={() => setExpandedSteps(!expandedSteps)}
            className="flex items-center justify-between w-full py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">
              {expandedSteps ? 'Hide Steps' : 'Show Steps'}
            </span>
            <ChevronDownIcon 
              className={`w-4 h-4 text-gray-500 transition-transform ${
                expandedSteps ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSteps && (
            <div className="mt-3 space-y-2">
              {task.premiumFeatures.steps?.map((step, index) => (
                <StepItem
                  key={step._id}
                  step={step}
                  onComplete={() => handleStepComplete(step.stepNumber)}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <QuickStat
          label="Streak"
          value={task.streakCurrent}
          icon="🔥"
          color="text-orange-600"
        />
        <QuickStat
          label="Points"
          value={task.premiumFeatures.rewardPoints || 0}
          icon="⭐"
          color="text-yellow-600"
        />
        <QuickStat
          label="Badges"
          value={task.premiumFeatures.badges?.length || 0}
          icon="🏆"
          color="text-purple-600"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={() => isCompleted ? null : setExpandedSteps(true)}
        disabled={isCompleted}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
          isCompleted
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isCompleted ? (
          <span className="flex items-center justify-center">
            <CheckIcon className="w-5 h-5 mr-2" />
            All Steps Completed Today!
          </span>
        ) : (
          `Complete ${totalSteps - completedSteps} more steps`
        )}
      </button>
    </div>
  );
};

// components/premium/StepItem.tsx
'use client';

import React from 'react';
import { ITaskStep } from '@/types';

interface StepItemProps {
  step: ITaskStep;
  onComplete: () => void;
  isProcessing: boolean;
}

const StepItem: React.FC<StepItemProps> = ({ step, onComplete, isProcessing }) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 ${
      step.isCompleted 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      <div className="flex items-center space-x-3 flex-1">
        <div className="text-2xl">{step.icon || '•'}</div>
        
        <div className="flex-1">
          <h4 className={`font-medium ${
            step.isCompleted ? 'text-green-800 line-through' : 'text-gray-800'
          }`}>
            {step.title}
          </h4>
          
          {step.description && (
            <p className="text-sm text-gray-600">{step.description}</p>
          )}
          
          {step.estimatedMinutes && (
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full inline-block mt-1">
              ~{step.estimatedMinutes} min
            </span>
          )}
        </div>
      </div>
      
      <button
        onClick={onComplete}
        disabled={step.isCompleted || isProcessing}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
          step.isCompleted
            ? 'bg-green-500 text-white cursor-not-allowed'
            : isProcessing
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
        }`}
      >
        {step.isCompleted ? (
          <CheckIcon className="w-4 h-4" />
        ) : isProcessing ? (
          <LoadingIcon className="w-4 h-4" />
        ) : (
          <span className="text-sm font-bold">✓</span>
        )}
      </button>
    </div>
  );
};

// components/premium/PremiumTaskCreator.tsx
'use client';

import React, { useState } from 'react';
import { STEP_TEMPLATES, TaskCategory, DifficultyLevel } from '@/types';

interface PremiumTaskCreatorProps {
  onCreateTask: (taskData: any) => Promise<void>;
  onCancel: () => void;
}

const PremiumTaskCreator: React.FC<PremiumTaskCreatorProps> = ({ onCreateTask, onCancel }) => {
  const [step, setStep] = useState(1);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    isPremium: false,
    hasSteps: false,
    steps: [] as any[],
    category: TaskCategory.PERSONAL,
    difficulty: DifficultyLevel.MEDIUM,
    hasTimeTracking: false,
    hasReminders: false,
    reminderTimes: [] as string[],
    hasRewards: false
  });

  const handleTemplateSelect = (templateKey: string) => {
    const template = STEP_TEMPLATES[templateKey as keyof typeof STEP_TEMPLATES];
    setTaskData(prev => ({
      ...prev,
      title: template.name,
      description: `Complete all steps for ${template.name.toLowerCase()}`,
      hasSteps: true,
      isPremium: true,
      steps: template.steps.map((step, index) => ({
        stepNumber: index + 1,
        title: step.title,
        icon: step.icon,
        estimatedMinutes: step.estimatedMinutes,
        isRequired: true,
        isCompleted: false
      }))
    }));
    setStep(2);
  };

  const handleCustomSteps = () => {
    setTaskData(prev => ({ ...prev, hasSteps: true, isPremium: true }));
    setStep(2);
  };

  const addCustomStep = () => {
    const newStep = {
      stepNumber: taskData.steps.length + 1,
      title: '',
      description: '',
      estimatedMinutes: 5,
      isRequired: true,
      isCompleted: false,
      icon: '•'
    };
    setTaskData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const updateStep = (index: number, field: string, value: any) => {
    const updatedSteps = [...taskData.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setTaskData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const removeStep = (index: number) => {
    const updatedSteps = taskData.steps.filter((_, i) => i !== index);
    setTaskData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const handleSubmit = async () => {
    try {
      await onCreateTask(taskData);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Premium Task
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Template Selection */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Your Task Type</h3>
              
              {/* Template Options */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {Object.entries(STEP_TEMPLATES).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => handleTemplateSelect(key)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl">{template.icon}</span>
                      <h4 className="font-bold text-gray-800">{template.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {template.steps.length} steps • {template.steps.reduce((sum, s) => sum + (s.estimatedMinutes || 0), 0)} min total
                    </p>
                    <div className="text-xs text-blue-600">
                      {template.steps.slice(0, 3).map(s => s.title).join(' • ')}
                      {template.steps.length > 3 && '...'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Option */}
              <button
                onClick={handleCustomSteps}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">➕</div>
                  <h4 className="font-bold text-gray-800 mb-1">Create Custom Steps</h4>
                  <p className="text-sm text-gray-600">Build your own step-by-step task</p>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Task Configuration */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Configure Your Task</h3>
                
                {/* Basic Info */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={taskData.title}
                      onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      placeholder="Enter task title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={taskData.description}
                      onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      rows={3}
                      placeholder="Describe your task"
                    />
                  </div>
                </div>

                {/* Steps Configuration */}
                {taskData.hasSteps && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800">Task Steps</h4>
                      <button
                        onClick={addCustomStep}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Add Step
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {taskData.steps.map((step, index) => (
                        <div key={index} className="p-4 border-2 border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700">Step {index + 1}</span>
                            <button
                              onClick={() => removeStep(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => updateStep(index, 'title', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                              placeholder="Step title"
                            />
                            <input
                              type="number"
                              value={step.estimatedMinutes}
                              onChange={(e) => updateStep(index, 'estimatedMinutes', parseInt(e.target.value))}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                              placeholder="Minutes"
                              min="1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Premium Features */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={taskData.category}
                      onChange={(e) => setTaskData(prev => ({ ...prev, category: e.target.value as TaskCategory }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    >
                      {Object.values(TaskCategory).map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={taskData.difficulty}
                      onChange={(e) => setTaskData(prev => ({ ...prev, difficulty: e.target.value as DifficultyLevel }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    >
                      {Object.values(DifficultyLevel).map(diff => (
                        <option key={diff} value={diff}>
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Feature Toggles */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-800">Premium Features</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FeatureToggle
                      label="Time Tracking"
                      description="Track time spent on each step"
                      enabled={taskData.hasTimeTracking}
                      onChange={(enabled) => setTaskData(prev => ({ ...prev, hasTimeTracking: enabled }))}
                      icon="⏱️"
                    />
                    
                    <FeatureToggle
                      label="Smart Reminders"
                      description="Get reminded at optimal times"
                      enabled={taskData.hasReminders}
                      onChange={(enabled) => setTaskData(prev => ({ ...prev, hasReminders: enabled }))}
                      icon="⏰"
                    />
                    
                    <FeatureToggle
                      label="Reward Points"
                      description="Earn points and badges"
                      enabled={taskData.hasRewards}
                      onChange={(enabled) => setTaskData(prev => ({ ...prev, hasRewards: enabled }))}
                      icon="🏆"
                    />
                    
                    <FeatureToggle
                      label="Daily Notes"
                      description="Add reflection notes"
                      enabled={false}
                      onChange={() => {}}
                      icon="📝"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!taskData.title.trim() || !taskData.description.trim()}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Premium Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// components/premium/FeatureToggle.tsx
interface FeatureToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon: string;
  disabled?: boolean;
}

const FeatureToggle: React.FC<FeatureToggleProps> = ({ 
  label, 
  description, 
  enabled, 
  onChange, 
  icon, 
  disabled = false 
}) => (
  <div className={`p-4 border-2 rounded-xl transition-all ${
    enabled && !disabled
      ? 'border-blue-500 bg-blue-50'
      : 'border-gray-200 bg-white'
  } ${disabled ? 'opacity-50' : ''}`}>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <span className="text-xl">{icon}</span>
        <span className="font-semibold text-gray-800">{label}</span>
      </div>
      <button
        onClick={() => !disabled && onChange(!enabled)}
        disabled={disabled}
        className={`w-12 h-6 rounded-full transition-colors relative ${
          enabled && !disabled ? 'bg-blue-500' : 'bg-gray-300'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
          enabled && !disabled ? 'translate-x-6' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
    {disabled && (
      <p className="text-xs text-orange-600 mt-1">Coming Soon!</p>
    )}
  </div>
);

// API Routes for Premium Features

// app/api/tasks/[id]/steps/[stepNumber]/complete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import EnhancedTask from '@/models/EnhancedTask';
import { getUserFromToken } from '@/lib/middleware';
import { ApiResponse } from '@/types';

interface RouteParams {
  params: Promise<{ id: string; stepNumber: string }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<any>>> {
  try {
    const { id, stepNumber } = await params;
    
    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const task = await EnhancedTask.findOne({ _id: id, userId });
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Find and update the specific step
    const stepIndex = task.steps.findIndex(step => step.stepNumber === parseInt(stepNumber));
    if (stepIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Step not found' },
        { status: 404 }
      );
    }

    // Mark step as completed
    task.steps[stepIndex].isCompleted = true;
    task.steps[stepIndex].completedAt = new Date();

    // Update step progress
    const completedSteps = task.steps.filter(step => step.isCompleted).length;
    task.stepProgress = {
      completed: completedSteps,
      total: task.steps.length,
      percentage: Math.round((completedSteps / task.steps.length) * 100)
    };

    // Award points for premium features
    if (task.hasRewards) {
      const pointsPerStep = 10;
      task.rewardPoints = (task.rewardPoints || 0) + pointsPerStep;
      
      // Check for badges
      await checkAndAwardBadges(task, completedSteps);
    }

    await task.save();

    return NextResponse.json({
      success: true,
      data: {
        stepCompleted: true,
        stepProgress: task.stepProgress,
        rewardPoints: task.rewardPoints,
        allStepsCompleted: completedSteps === task.steps.length
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

// app/api/premium/templates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { STEP_TEMPLATES } from '@/types';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    data: STEP_TEMPLATES
  });
}

// Helper Functions
const checkAndAwardBadges = async (task: any, completedSteps: number) => {
  const badges = [];

  // First step badge
  if (completedSteps === 1 && !task.badges.find((b: any) => b.name === 'First Step')) {
    badges.push({
      name: 'First Step',
      description: 'Completed your first step!',
      icon: '🎯',
      rarity: 'common',
      condition: 'Complete first step',
      earnedAt: new Date()
    });
  }

  // All steps completed badge
  if (completedSteps === task.steps.length && !task.badges.find((b: any) => b.name === 'Task Master')) {
    badges.push({
      name: 'Task Master',
      description: 'Completed all steps in a task!',
      icon: '👑',
      rarity: 'rare',
      condition: 'Complete all steps',
      earnedAt: new Date()
    });
  }

  // Speed demon badge (all steps in under estimated time)
  const totalEstimatedTime = task.steps.reduce((sum: number, step: any) => sum + (step.estimatedMinutes || 0), 0);
  if (task.actualDuration && task.actualDuration < totalEstimatedTime * 0.8) {
    badges.push({
      name: 'Speed Demon',
      description: 'Completed task 20% faster than estimated!',
      icon: '⚡',
      rarity: 'epic',
      condition: 'Complete task 20% faster',
      earnedAt: new Date()
    });
  }

  task.badges.push(...badges);
  return badges;
};

// components/premium/PremiumFeaturesBanner.tsx
'use client';

import React from 'react';

interface PremiumFeaturesBannerProps {
  onUpgrade: () => void;
}

const PremiumFeaturesBanner: React.FC<PremiumFeaturesBannerProps> = ({ onUpgrade }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl p-6 mb-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">🌟 Unlock Premium Features!</h3>
          <ul className="text-sm space-y-1 opacity-90">
            <li>✨ Step-by-step task completion</li>
            <li>🏆 Rewards, points, and badges</li>
            <li>⏱️ Time tracking and analytics</li>
            <li>📱 Smart reminders and notifications</li>
            <li>📊 Advanced progress insights</li>
            <li>🎯 Custom task templates</li>
          </ul>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-2">💎</div>
          <button
            onClick={onUpgrade}
            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors shadow-lg"
          >
            Upgrade Now
          </button>
          <p className="text-xs mt-2 opacity-75">Starting at $4.99/month</p>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const CategoryBadge: React.FC<{ category: TaskCategory }> = ({ category }) => {
  const categoryColors = {
    [TaskCategory.HEALTH]: 'bg-green-100 text-green-800',
    [TaskCategory.FITNESS]: 'bg-red-100 text-red-800',
    [TaskCategory.LEARNING]: 'bg-blue-100 text-blue-800',
    [TaskCategory.WORK]: 'bg-gray-100 text-gray-800',
    [TaskCategory.PERSONAL]: 'bg-purple-100 text-purple-800',
    [TaskCategory.SOCIAL]: 'bg-pink-100 text-pink-800',
    [TaskCategory.CREATIVITY]: 'bg-yellow-100 text-yellow-800',
    [TaskCategory.MINDFULNESS]: 'bg-indigo-100 text-indigo-800',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[category]}`}>
      {category}
    </span>
  );
};

const QuickStat: React.FC<{
  label: string;
  value: number;
  icon: string;
  color: string;
}> = ({ label, value, icon, color }) => (
  <div className="text-center">
    <div className="text-lg mb-1">{icon}</div>
    <div className={`text-lg font-bold ${color}`}>{value}</div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);

// Icon Components
const StarIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const EyeIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const TrashIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const LoadingIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={`${className} animate-spin`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const XIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default StepBasedTaskCard;