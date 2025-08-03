'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import StepBasedTaskCard, { CheckIcon, EyeIcon, StarIcon, TrashIcon } from './StepBasedTaskCard';
import { IEnhancedTask } from '@/types/premium';
import { isCompletedToday, formatDate } from '@/lib/taskHelpers';

const EnhancedTaskCard: React.FC<PremiumTaskCardProps> = ({ 
  task, 
  onTaskComplete, 
  onDelete 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
//   const { canAccessFeature } = useSubscription();
  const canAccessFeature = true
  const router = useRouter();

  const handleComplete = async () => {
    if (isCompleting || completedToday) return;
    
    setIsCompleting(true);
    try {
      await onTaskComplete(task._id);
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const completedToday = isCompletedToday(task);

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

      {/* Header with Category */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
            {task.premiumFeatures?.category && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {task.premiumFeatures.category}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm">{task.description}</p>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => router.push(`streak-tracker/tasks/${task._id}`)}
            className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition-colors"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Stats with Premium Features */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-orange-600">{task.streakCurrent}</div>
          <div className="text-xs text-gray-600">Streak</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-600">
            {task.premiumFeatures?.rewardPoints || 0}
          </div>
          <div className="text-xs text-gray-600">Points</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">
            {task.premiumFeatures?.badges?.length || 0}
          </div>
          <div className="text-xs text-gray-600">Badges</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {task.premiumFeatures?.estimatedDuration || 0}m
          </div>
          <div className="text-xs text-gray-600">Time</div>
        </div>
      </div>

      {/* Time Tracking (if enabled) */}
      {canAccessFeature && task.premiumFeatures?.hasTimeTracking && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Estimated: {task.premiumFeatures.estimatedDuration || 0} min</span>
            <span>Actual: {task.premiumFeatures.actualDuration || 0} min</span>
          </div>
        </div>
      )}

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={isCompleting || completedToday}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
          completedToday
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 cursor-not-allowed'
            : isCompleting
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {completedToday ? '✓ Completed Today' : isCompleting ? 'Completing...' : 'Mark Complete'}
      </button>
    </div>
  );
};


interface PremiumTaskCardProps {
  task: IEnhancedTask;
  onStepComplete: (taskId: string, stepNumber: number) => Promise<void>;
  onTaskComplete: (taskId: string) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

export const PremiumTaskCard: React.FC<PremiumTaskCardProps> = (props) => {
  const { task } = props;
//   const { canAccessFeature } = useSubscription();
  const canAccessFeature = true

  // Check if task has premium features
  const hasPremiumFeatures = task.isPremium || task.premiumFeatures?.hasSteps;

  // If task has steps and user has premium access, show step-based card
  if (hasPremiumFeatures && task.premiumFeatures?.hasSteps) {
    return (
    //   <FeatureGate 
    //     feature="hasSteps"
    //     fallback={<BasicTaskCard {...props} />}
    //   >
        <StepBasedTaskCard {...props} />
    //   </FeatureGate>
    );
  }

  // If task has other premium features, show enhanced basic card
  if (hasPremiumFeatures) {
    return (
    //   <FeatureGate 
    //     feature="hasTimeTracking"
    //     fallback={<BasicTaskCard {...props} />}
    //   >
        <EnhancedTaskCard {...props} />
    //   </FeatureGate>
    );
  }

  // Default to basic task card
  return <BasicTaskCard {...props} />;
};

// 4. Basic TaskCard for non-premium users or fallback

const BasicTaskCard: React.FC<PremiumTaskCardProps> = ({ 
  task, 
  onTaskComplete, 
  onDelete 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleComplete = async () => {
    if (isCompleting || completedToday) return;
    
    setIsCompleting(true);
    try {
      await onTaskComplete(task._id);
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
      setIsDeleting(false);
    }
  };

  const completedToday = isCompletedToday(task);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-white/20 p-6 transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
            {task.title}
          </h3>
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {task.description}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => router.push(`/streak-tracker/tasks/${task._id}`)}
            className="p-2 rounded-full text-blue-500 hover:bg-blue-50 transition-colors"
            title="View details"
          >
            <EyeIcon className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Delete task"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {task.streakCurrent}
          </div>
          <div className="text-xs font-medium text-blue-700 mt-1">Current</div>
        </div>
        
        <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {task.streakMax}
          </div>
          <div className="text-xs font-medium text-green-700 mt-1">Best</div>
        </div>
        
        <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
          <div className="text-xs font-bold text-purple-700 leading-tight">
            {formatDate(task.streakLast)}
          </div>
          <div className="text-xs font-medium text-purple-600 mt-1">Last</div>
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={isCompleting || completedToday}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform ${
          completedToday
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 cursor-not-allowed'
            : isCompleting
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
        }`}
      >
        {completedToday ? (
          <span className="flex items-center justify-center">
            <CheckIcon className="w-5 h-5 mr-2" />
            Completed Today
          </span>
        ) : isCompleting ? (
          'Completing...'
        ) : (
          'Mark Complete'
        )}
      </button>
    </div>
  );
};
