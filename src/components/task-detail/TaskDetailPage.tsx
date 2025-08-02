'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useApiWithAuth } from '@/hooks/useApiWithAuth';
import StreakCalendar from '@/components/streak/StreakCalendar';
import TaskEditForm from './TaskEditForm';
import StreakAnalytics from './StreakAnalytics';
import StreakHistory from './StreakHistory';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { ITaskEnhanced, CompletionStatus, MoodType, EffortLevel, TaskAnalytics } from '@/types';
import StreakEntry from '@/models/StreakEntry';
import TaskOverview from './TaskOverview';

const TaskDetailPage: React.FC = () => {
  const params = useParams();
  const taskId = params.id as string;
  const { apiCall } = useApiWithAuth();
  
  const [task, setTask] = useState<ITaskEnhanced | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'analytics' | 'history' | 'settings'>('overview');

  useEffect(() => {
    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall(`/api/tasks/${taskId}/details`);
      const data = await response.json();
      
      if (data.success) {
        setTask(data.data);
      } else {
        setError(data.error || 'Failed to fetch task details');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch task details');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (completionData: {
    notes?: string;
    mood?: MoodType;
    effort?: EffortLevel;
    status?: CompletionStatus;
  }) => {
    try {
      const response = await apiCall(`/api/tasks/${taskId}/complete-enhanced`, {
        method: 'POST',
        body: JSON.stringify(completionData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh task details to get updated streak info
        await fetchTaskDetails();
      } else {
        throw new Error(data.error || 'Failed to complete task');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateTask = async (updatedTask: Partial<ITaskEnhanced>) => {
    try {
      const response = await apiCall(`/api/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTask),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTask(prev => prev ? { ...prev, ...data.data } : null);
      } else {
        throw new Error(data.error || 'Failed to update task');
      }
    } catch (error) {
      throw error;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={fetchTaskDetails} />;
  if (!task) return <ErrorMessage error="Task not found" onRetry={fetchTaskDetails} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <TaskStatusBadge task={task} />
              <DifficultyBadge difficulty={task.difficulty} />
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickStatCard
              label="Current Streak"
              value={task.streakCurrent}
              icon="🔥"
              color="text-orange-600"
            />
            <QuickStatCard
              label="Best Streak"
              value={task.streakMax}
              icon="🏆"
              color="text-yellow-600"
            />
            <QuickStatCard
              label="Total Completions"
              value={task.analytics?.totalCompletions || 0}
              icon="✅"
              color="text-green-600"
            />
            <QuickStatCard
              label="Completion Rate"
              value={`${Math.round(task.analytics?.completionRate || 0)}%`}
              icon="📊"
              color="text-blue-600"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'overview', label: 'Overview', icon: '📋' },
                { key: 'calendar', label: 'Calendar', icon: '📅' },
                { key: 'analytics', label: 'Analytics', icon: '📊' },
                { key: 'history', label: 'History', icon: '📚' },
                { key: 'settings', label: 'Settings', icon: '⚙️' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <TaskOverview 
              task={task} 
              onComplete={handleCompleteTask}
            />
          )}
          
          {activeTab === 'calendar' && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
              <StreakCalendar task={task} />
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <StreakAnalytics task={task} />
          )}
          
          {activeTab === 'history' && (
            <StreakHistory streakEntries={task.streakEntries || []} />
          )}
          
          {activeTab === 'settings' && (
            <TaskEditForm 
              task={task} 
              onUpdate={handleUpdateTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const TaskStatusBadge: React.FC<{ task: ITaskEnhanced }> = ({ task }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    task.isActive 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800'
  }`}>
    {task.isActive ? 'Active' : 'Inactive'}
  </span>
);

const DifficultyBadge: React.FC<{ difficulty?: string }> = ({ difficulty }) => {
  const colors = {
    easy: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
      colors[difficulty as keyof typeof colors] || colors.medium
    }`}>
      {difficulty || 'Medium'}
    </span>
  );
};

const QuickStatCard: React.FC<{
  label: string;
  value: string | number;
  icon: string;
  color: string;
}> = ({ label, value, icon, color }) => (
  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

// Helper functions
export const calculateTaskAnalytics = (streakEntries: any[]): TaskAnalytics => {
  const totalCompletions = streakEntries.filter(entry => 
    entry.status === CompletionStatus.COMPLETED
  ).length;
  
  const completionRate = streakEntries.length > 0 
    ? (totalCompletions / streakEntries.length) * 100 
    : 0;
  
  // Calculate average streak length
  const streaks = calculateStreaks(streakEntries);
  const averageStreakLength = streaks.length > 0 
    ? streaks.reduce((sum, streak) => sum + streak.length, 0) / streaks.length 
    : 0;
  
  const longestStreak = Math.max(...streaks.map(s => s.length), 0);
  
  // Find best month
  const monthlyCompletions = streakEntries.reduce((acc, entry) => {
    const month = new Date(entry.date).toISOString().slice(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const bestMonth = Object.keys(monthlyCompletions).reduce((a, b) => 
    monthlyCompletions[a] > monthlyCompletions[b] ? a : b, 
    Object.keys(monthlyCompletions)[0] || ''
  );
  
  const premiumCompletions = streakEntries.filter(entry => entry.isPremium).length;
  
  return {
    totalCompletions,
    averageStreakLength: Math.round(averageStreakLength * 10) / 10,
    longestStreak,
    completionRate: Math.round(completionRate * 10) / 10,
    bestMonth,
    consistencyScore: Math.round(completionRate * 0.7 + (longestStreak / totalCompletions * 100) * 0.3),
    premiumCompletions,
  };
};

const calculateStreaks = (entries: any[]) => {
  // Implementation to calculate streak segments
  const sortedEntries = entries
    .filter(e => e.status === CompletionStatus.COMPLETED)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const streaks = [];
  let currentStreak = [];
  
  for (let i = 0; i < sortedEntries.length; i++) {
    const entry = sortedEntries[i];
    const prevEntry = sortedEntries[i - 1];
    
    if (!prevEntry) {
      currentStreak = [entry];
    } else {
      const dayDiff = Math.floor(
        (new Date(entry.date).getTime() - new Date(prevEntry.date).getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (dayDiff === 1) {
        currentStreak.push(entry);
      } else {
        streaks.push(currentStreak);
        currentStreak = [entry];
      }
    }
  }
  
  if (currentStreak.length > 0) {
    streaks.push(currentStreak);
  }
  
  return streaks;
};

export const calculateStreakDayNumber = async (taskId: string, userId: string, today: Date): Promise<number> => {
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const yesterdayEntry = await StreakEntry.findOne({
    taskId,
    userId,
    date: yesterday,
    status: CompletionStatus.COMPLETED,
  });
  
  if (yesterdayEntry) {
    return yesterdayEntry.streakDayNumber + 1;
  }
  
  return 1; // Start new streak
};

export const determinePremiumStatus = (streakDayNumber: number, requestData: any): boolean => {
  // Premium conditions:
  // 1. Every 7th day of a streak
  // 2. High effort completions
  // 3. Milestone days (30, 60, 90, etc.)
  
  if (streakDayNumber % 7 === 0) return true;
  if (requestData.effort === EffortLevel.HIGH) return true;
  if ([30, 60, 90, 180, 365].includes(streakDayNumber)) return true;
  
  return false;
};

export default TaskDetailPage;