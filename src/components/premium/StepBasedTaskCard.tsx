'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IEnhancedTask } from '@/types/premium';
import { TaskCategory } from '@/types/premium';

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
    router.push(`/streak-tracker/tasks/${task._id}`);
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

interface PremiumFeaturesBannerProps {
  onUpgrade: () => void;
}

export const PremiumFeaturesBanner: React.FC<PremiumFeaturesBannerProps> = ({ onUpgrade }) => {
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

export const QuickStat: React.FC<{
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
export const StarIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export const EyeIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export const TrashIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const CheckIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export const LoadingIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={`${className} animate-spin`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const XIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default StepBasedTaskCard;