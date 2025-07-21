// app/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import TaskCard from '@/components/streak-tracker/TaskCard';
import AddTaskForm from '@/components/streak-tracker/AddTaskForm';
import LoadingSpinner from '@/components/streak-tracker/LoadingSpinner';
import ErrorMessage from '@/components/streak-tracker/ErrorMessage';
import { ITask, CreateTaskData, ApiResponse } from '@/types';

export default function HomePage() {
  // State management
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  // Fetch tasks from API
  const fetchTasks = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      
      // Only show loading spinner on initial load
      if (isInitialLoad) {
        setLoading(true);
      }

      const response = await fetch('/api/tasks', {
        cache: 'no-store', // Always fetch fresh data
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<ITask[]> = await response.json();
      
      if (data.success && data.data) {
        setTasks(data.data);
        setIsInitialLoad(false);
      } else {
        throw new Error(data.error || 'Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isInitialLoad]);

  // Add new task
  const addTask = async (taskData: CreateTaskData): Promise<void> => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<ITask> = await response.json();
      
      if (data.success && data.data) {
        // Add new task to the beginning of the list
        setTasks(prevTasks => [data.data!, ...prevTasks]);
        
        // Clear any existing errors
        setError(null);
      } else {
        throw new Error(data.error || 'Failed to add task');
      }
    } catch (error) {
      console.error('Error adding task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
      throw new Error(errorMessage); // Re-throw to be handled by the form
    }
  };

  // Complete a task
  const completeTask = async (taskId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse<ITask> = await response.json();
      
      if (data.success && data.data) {
        // Update the specific task in the list
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task._id === taskId ? data.data! : task
          )
        );
      } else {
        throw new Error(data.error || 'Failed to complete task');
      }
    } catch (error) {
      console.error('Error completing task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to complete task';
      throw new Error(errorMessage); // Re-throw to be handled by the component
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.success) {
        // Remove task from the list
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } else {
        throw new Error(data.error || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
      throw new Error(errorMessage); // Re-throw to be handled by the component
    }
  };

  // Calculate total active streaks
  const totalActiveStreaks = tasks.reduce((sum, task) => sum + task.streakCurrent, 0);

  // Get tasks completed today count
  const tasksCompletedToday = tasks.filter(task => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return task.completedDates?.some(date => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.getTime() === today.getTime();
    });
  }).length;

  // Calculate best streak across all tasks
  const bestOverallStreak = tasks.length > 0 
    ? Math.max(...tasks.map(task => task.streakMax))
    : 0;

  // Initial data fetch
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Loading state
  if (loading && isInitialLoad) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error && isInitialLoad) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={fetchTasks}
        title="Failed to Load Tasks"
        showDetails={process.env.NODE_ENV === 'development'}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
            <svg 
              className="w-8 h-8 text-white mr-3" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
              />
            </svg>
            <h1 className="text-4xl font-bold text-white">Streak Tracker</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Build lasting habits by tracking your daily progress. Every day counts towards your streak!
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          {/* Statistics Banner */}
          {tasks.length > 0 && (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {totalActiveStreaks}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    Total Active Streaks
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {tasksCompletedToday}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    Completed Today
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {bestOverallStreak}
                  </div>
                  <div className="text-sm font-medium text-gray-600 mt-1">
                    Best Streak Ever
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Task Form */}
          <AddTaskForm onAdd={addTask} />

          {/* Error Banner (for non-critical errors) */}
          {error && !isInitialLoad && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-red-800 font-medium">
                  {error}
                </span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                  aria-label="Dismiss error"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path 
                      fillRule="evenodd" 
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Tasks Section */}
          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TasksGrid tasks={tasks} onComplete={completeTask} onDelete={deleteTask} />
          )}
        </div>
      </div>
    </div>
  );
}

// Empty State Component
const EmptyState: React.FC = () => (
  <div className="text-center py-16">
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 max-w-md mx-auto">
      <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg 
          className="w-12 h-12 text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-700 mb-3">
        No tasks yet!
      </h3>
      <p className="text-gray-500 text-lg mb-6 leading-relaxed">
        Start building your habits by adding your first task above.
      </p>
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> Start with simple, achievable daily goals like "Drink 8 glasses of water" or "Read for 15 minutes"
        </p>
      </div>
    </div>
  </div>
);

// Tasks Grid Component
interface TasksGridProps {
  tasks: ITask[];
  onComplete: (taskId: string) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

const TasksGrid: React.FC<TasksGridProps> = ({ tasks, onComplete, onDelete }) => (
  <div>
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-gray-800">
        Your Tasks
        <span className="ml-2 text-lg font-normal text-gray-500">
          ({tasks.length})
        </span>
      </h2>
      <button
        onClick={() => window.location.reload()}
        className="text-sm text-gray-500 hover:text-gray-700 flex items-center transition-colors"
        title="Refresh tasks"
      >
        <svg 
          className="w-4 h-4 mr-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
        Refresh
      </button>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task, index) => (
        <div
          key={task._id}
          className="animate-slide-in"
          style={{ 
            animationDelay: `${Math.min(index * 0.1, 1)}s`,
            animationFillMode: 'both'
          }}
        >
          <TaskCard
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  </div>
);