'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useApiWithAuth } from '@/hooks/useApiWithAuth';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import ErrorMessage from '@/components/streak-tracker/ErrorMessage';
import { ITask, ApiResponse } from '@/types';
import { HistoryView } from '@/components/task-detail/HistoryView';
import AnalyticsView from '@/components/task-detail/AnalyticsView';
import { CalendarView } from '@/components/task-detail/CalendarView';
import { getDaysSinceCreation, QuickStatCard, TaskEditForm, TaskStatusBadge } from '@/components/task-detail/TaskEditForm';
import TaskOverview from '@/components/task-detail/TaskOverview';
import LoadingSpinner from '@/components/streak-tracker/LoadingSpinner';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  const { apiCall } = useApiWithAuth();
  const { isAuthenticated } = useAuth();
  
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'analytics' | 'history' | 'edit'>('overview');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId, isAuthenticated]);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiCall(`/api/tasks/${taskId}/details`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<ITask> = await response.json();
      
      if (data.success && data.data) {
        setTask(data.data);
      } else {
        setError(data.error || 'Failed to fetch task details');
      }
    } catch (error) {
      console.error('Error fetching task details:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch task details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (updatedData: Partial<ITask>) => {
    try {
      const response = await apiCall(`/api/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });

      const data: ApiResponse<ITask> = await response.json();
      
      if (data.success && data.data) {
        setTask(data.data);
        setActiveTab('overview'); // Return to overview after editing
      } else {
        throw new Error(data.error || 'Failed to update task');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleCompleteTask = async () => {
    try {
      const response = await apiCall(`/api/tasks/${taskId}/complete`, {
        method: 'POST',
      });

      const data: ApiResponse<ITask> = await response.json();
      
      if (data.success && data.data) {
        setTask(data.data);
      } else {
        throw new Error(data.error || 'Failed to complete task');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await apiCall(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      const data: ApiResponse = await response.json();
      
      if (data.success) {
        router.push('/'); // Redirect to home page
      } else {
        throw new Error(data.error || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <ErrorMessage 
          error={error} 
          onRetry={fetchTaskDetails}
          title="Failed to Load Task"
        />
      </div>
    );
  }

  if (!task) {
    return (
      <div>
        <Header />
        <ErrorMessage 
          error="Task not found" 
          onRetry={() => router.push('/')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => router.push('/')}
              className="hover:text-blue-600 transition-colors"
            >
              Dashboard
            </button>
            <span>›</span>
            <span className="text-gray-800 font-medium">{task.title}</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                {task.description}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <TaskStatusBadge isActive={true} />
              <button
                onClick={() => setActiveTab('edit')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Edit Task
              </button>
              <button
                onClick={handleDeleteTask}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickStatCard
              label="Current Streak"
              value={task.streakCurrent}
              icon="🔥"
              color="text-orange-600"
              bgColor="bg-orange-50"
            />
            <QuickStatCard
              label="Best Streak"
              value={task.streakMax}
              icon="🏆"
              color="text-yellow-600"
              bgColor="bg-yellow-50"
            />
            <QuickStatCard
              label="Total Days"
              value={task.completedDates?.length || 0}
              icon="✅"
              color="text-green-600"
              bgColor="bg-green-50"
            />
            <QuickStatCard
              label="Days Since Start"
              value={getDaysSinceCreation(task.createdAt)}
              icon="📅"
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200 bg-white/60 backdrop-blur-sm rounded-t-xl">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: '📋' },
                { key: 'calendar', label: 'Calendar View', icon: '📅' },
                { key: 'analytics', label: 'Analytics', icon: '📊' },
                { key: 'history', label: 'History', icon: '📚' },
                { key: 'edit', label: 'Edit Task', icon: '⚙️' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
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
              onRefresh={fetchTaskDetails}
            />
          )}
          
          {activeTab === 'calendar' && (
            <CalendarView task={task} />
          )}
          
          {activeTab === 'analytics' && (
            <AnalyticsView task={task} />
          )}
          
          {activeTab === 'history' && (
            <HistoryView task={task} />
          )}
          
          {activeTab === 'edit' && (
            <TaskEditForm 
              task={task} 
              onUpdate={handleUpdateTask}
              onCancel={() => setActiveTab('overview')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
