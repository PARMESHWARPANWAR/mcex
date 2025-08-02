'use client';

import React, { useState, FormEvent } from 'react';
import { ITask } from '@/types';

interface TaskEditFormProps {
  task: ITask;
  onUpdate: (data: Partial<ITask>) => Promise<void>;
  onCancel: () => void;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onUpdate(formData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Task</h3>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder="Enter task title"
            required
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
            placeholder="Describe your task"
            required
            maxLength={500}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Task'}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-6 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper Components
export const TaskStatusBadge: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }`}>
    {isActive ? 'Active' : 'Inactive'}
  </span>
);

export const QuickStatCard: React.FC<{
  label: string;
  value: string | number;
  icon: string;
  color: string;
  bgColor: string;
}> = ({ label, value, icon, color, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-4 text-center border border-white/20`}>
    <div className="text-3xl mb-2">{icon}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-4 h-4 rounded ${color}`} />
    <span className="text-sm text-gray-600">{label}</span>
  </div>
);

export const MetricCard: React.FC<{
  title: string;
  value: string | number;
  description: string;
  color: string;
  bgColor: string;
}> = ({ title, value, description, color, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-6 border border-white/20`}>
    <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
    <div className={`text-3xl font-bold ${color} mb-2`}>{value}</div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export const ProgressBar: React.FC<{ current: number; max: number; label: string }> = ({ current, max, label }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium text-gray-800">{current} / {max}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-300"
        style={{ width: `${max > 0 ? (current / max) * 100 : 0}%` }}
      />
    </div>
  </div>
);

export const MilestoneList: React.FC<{ currentStreak: number }> = ({ currentStreak }) => {
  const milestones = [7, 14, 30, 60, 90, 180, 365];
  const nextMilestones = milestones.filter(m => m > currentStreak).slice(0, 3);
  
  return (
    <div className="space-y-3">
      {nextMilestones.map(milestone => (
        <div key={milestone} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">{milestone} days</span>
          <span className="text-xs text-gray-500">{milestone - currentStreak} days to go</span>
        </div>
      ))}
      {nextMilestones.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          🎉 You've reached all major milestones!
        </div>
      )}
    </div>
  );
};

export const InsightsList: React.FC<{ stats: any; task: ITask }> = ({ stats, task }) => {
  const insights = generateInsights(stats, task);
  
  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl">{insight.icon}</div>
          <div>
            <h4 className="font-semibold text-gray-800">{insight.title}</h4>
            <p className="text-sm text-gray-600">{insight.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const RecentActivityList: React.FC<{ task: ITask }> = ({ task }) => {
  const recentDates = (task.completedDates || [])
    .slice(-7)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (recentDates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">📝</div>
        <p>No activity yet. Complete your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentDates.map((date, index) => (
        <div key={index} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="font-medium text-gray-800">Task Completed</span>
          </div>
          <span className="text-sm text-gray-600">
            {new Date(date).toLocaleDateString(undefined, { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      ))}
    </div>
  );
};

export const HistoryItem: React.FC<{ date: Date; dayNumber: number }> = ({ date, dayNumber }) => {
  const dayOfWeek = new Date(date).toLocaleDateString(undefined, { weekday: 'long' });
  const formattedDate = new Date(date).toLocaleDateString(undefined, { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="flex items-center justify-between py-4 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">✓</span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">Completed</h4>
          <p className="text-sm text-gray-600">{dayOfWeek}, {formattedDate}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-blue-600">#{dayNumber}</div>
        <div className="text-xs text-gray-500">Completion</div>
      </div>
    </div>
  );
};

// Utility Functions
export const getDaysSinceCreation = (createdAt: Date): number => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffTime = Math.abs(now.getTime() - created.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const generateInsights = (stats: any, task: ITask) => {
  const insights = [];

  if (stats.completionRate >= 80) {
    insights.push({
      icon: '🎉',
      title: 'Excellent Consistency!',
      description: 'You\'re maintaining a great completion rate. Keep up the fantastic work!',
    });
  } else if (stats.completionRate >= 60) {
    insights.push({
      icon: '👍',
      title: 'Good Progress',
      description: 'You\'re doing well! Try to be more consistent to reach the next level.',
    });
  } else {
    insights.push({
      icon: '💪',
      title: 'Room for Improvement',
      description: 'Consider setting reminders or breaking the task into smaller parts.',
    });
  }

  if (task.streakCurrent >= 7) {
    insights.push({
      icon: '🔥',
      title: 'Week-long Streak!',
      description: 'You\'ve built a solid weekly habit. Aim for the next milestone!',
    });
  }

  if (task.streakMax >= 30) {
    insights.push({
      icon: '🏆',
      title: 'Habit Master',
      description: 'You\'ve proven you can maintain long-term habits. Impressive dedication!',
    });
  }

  const daysSinceLastCompletion = task.streakLast 
    ? Math.floor((Date.now() - new Date(task.streakLast).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  if (daysSinceLastCompletion > 3) {
    insights.push({
      icon: '⏰',
      title: 'Time to Get Back',
      description: 'It\'s been a few days. Complete today to restart your momentum!',
    });
  }

  return insights.length > 0 ? insights : [{
    icon: '🌟',
    title: 'Getting Started',
    description: 'Complete more days to unlock personalized insights and recommendations.',
  }];
};
