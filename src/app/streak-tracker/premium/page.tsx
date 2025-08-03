'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useApiWithAuth } from '@/hooks/useApiWithAuth';
import Header from '@/components/layout/Header';
import { CreateTaskData, ApiResponse } from '@/types';
import { IEnhancedTask } from '@/types/premium';
import { PremiumTaskCreator } from '@/components/premium/PremiumTaskCreator';
import ErrorMessage from '@/components/streak-tracker/ErrorMessage';
import AddTaskForm from '@/components/streak-tracker/AddTaskForm';
import { PremiumTaskCard } from '@/components/premium/PremiumTaskCard';
import LoadingSpinner from '@/components/streak-tracker/LoadingSpinner';

type CombinedTask = IEnhancedTask & {
    taskType?: 'basic' | 'premium';
    streakCurrent?: number;
    streakMax?: number;
    completedDates?: Date[];
    completedAt?: Date;
    isCompleted?: boolean;
};

interface TasksGridProps {
    tasks: IEnhancedTask[];
    onStepComplete: (taskId: string, stepNumber: number) => Promise<void>;
    onTaskComplete: (taskId: string) => Promise<void>;
    onDelete: (taskId: string) => Promise<void>;
}

const TasksGrid: React.FC<TasksGridProps> = ({
    tasks,
    onStepComplete,
    onTaskComplete,
    onDelete
}) => (
    <div>
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
                Your Tasks
                <span className="ml-2 text-lg font-normal text-gray-500">
                    ({tasks.length})
                </span>
            </h2>
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
                    {/* This is where we use PremiumTaskCard */}
                    <PremiumTaskCard
                        task={task}
                        onStepComplete={onStepComplete}
                        onTaskComplete={onTaskComplete}
                        onDelete={onDelete}
                    />
                </div>
            ))}
        </div>
    </div>
);


const EmptyState: React.FC = () => (
    <div className="text-center py-16">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
                Ready to start your first habit?
            </h3>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                Create your first task above and begin building lasting habits today!
            </p>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-blue-700">
                    💡 <strong>Tip:</strong> Try creating a premium step-based task for better tracking
                </p>
            </div>
        </div>
    </div>
);


export default function HomePage() {
    const { user, isAuthenticated } = useAuth();
    // const { subscription, features, canAccessFeature } = useSubscription();
    const canAccessFeature = true
    const { apiCall } = useApiWithAuth();

    const [tasks, setTasks] = useState<IEnhancedTask[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showPremiumCreator, setShowPremiumCreator] = useState<boolean>(false);

    // Fetch tasks from API
    const fetchTasks = useCallback(async (): Promise<void> => {
        if (!isAuthenticated) return;

        try {
            setError(null);
            setLoading(true);

            const response = await apiCall('/api/tasks/all');
            

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse<{ tasks: IEnhancedTask[]; summary: any }> = await response.json();
            // const data: ApiResponse<IEnhancedTask[]> = await response.json();

            if (data.success && data.data) {
                setTasks(data.data.tasks);
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
    }, [isAuthenticated, apiCall]);

    // Add new task (basic or premium)
    const addTask = async (taskData: CreateTaskData): Promise<void> => {
        try {
            const response = await apiCall('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse<IEnhancedTask> = await response.json();

            if (data.success && data.data) {
                setTasks(prevTasks => [data.data!, ...prevTasks]);
                setError(null);
            } else {
                throw new Error(data.error || 'Failed to add task');
            }
        } catch (error) {
            console.error('Error adding task:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to add task';
            throw new Error(errorMessage);
        }
    };

    // Add premium task with steps
    const addPremiumTask = async (taskData: any): Promise<void> => {
        try {
            const response = await apiCall('/api/tasks/premium', {
                method: 'POST',
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse<IEnhancedTask> = await response.json();

            if (data.success && data.data) {
                setTasks(prevTasks => [data.data!, ...prevTasks]);
                setShowPremiumCreator(false);
                setError(null);
            } else {
                throw new Error(data.error || 'Failed to add premium task');
            }
        } catch (error) {
            console.error('Error adding premium task:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to add premium task';
            throw new Error(errorMessage);
        }
    };

    // Complete individual step in a task
    const completeStep = async (taskId: string, stepNumber: number): Promise<void> => {
        try {
            const response = await apiCall(`/api/tasks/${taskId}/steps/${stepNumber}/complete`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse<any> = await response.json();

            if (data.success) {
                // Update the task with completed step
                setTasks(prevTasks =>
                    prevTasks.map(task => {
                        if (task._id === taskId) {
                            // Update the specific step
                            const updatedSteps = task.premiumFeatures.steps?.map(step =>
                                step.stepNumber === stepNumber
                                    ? { ...step, isCompleted: true, completedAt: new Date() }
                                    : step
                            );

                            return {
                                ...task,
                                premiumFeatures: {
                                    ...task.premiumFeatures,
                                    steps: updatedSteps,
                                    stepProgress: data.data.stepProgress
                                },
                                rewardPoints: data.data.rewardPoints || task.rewardPoints
                            };
                        }
                        return task;
                    })
                );
            } else {
                throw new Error(data.error || 'Failed to complete step');
            }
        } catch (error) {
            console.error('Error completing step:', error);
            throw error;
        }
    };

    // Complete entire task (when all steps are done)
    const completeTask = async (taskId: string): Promise<void> => {
        try {
            const response = await apiCall(`/api/tasks/${taskId}/complete`, {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse<IEnhancedTask> = await response.json();

            if (data.success && data.data) {
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
            throw error;
        }
    };

    // Delete a task
    const deleteTask = async (taskId: string): Promise<void> => {
        try {
            const response = await apiCall(`/api/tasks/${taskId}`, {
                method: 'DELETE',
            });

            const data: ApiResponse = await response.json();

            if (data.success) {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
            } else {
                throw new Error(data.error || 'Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    };

    // Calculate statistics
    const totalActiveStreaks = tasks.reduce((sum, task) => {
        // Check if task has streakCurrent property (premium tasks)
        return sum + (task.streakCurrent || 0);
    }, 0);

    const tasksCompletedToday = tasks.filter(task => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Handle both basic and premium task completion tracking
        if (task.completedDates && Array.isArray(task.completedDates)) {
            return task.completedDates.some(date => {
                const completedDate = new Date(date);
                completedDate.setHours(0, 0, 0, 0);
                return completedDate.getTime() === today.getTime();
            });
        }

        // For basic tasks, check if completed today using other fields
        if (task.isCompleted && task.completedAt) {
            const completedDate = new Date(task.completedAt);
            completedDate.setHours(0, 0, 0, 0);
            return completedDate.getTime() === today.getTime();
        }

        return false;
    }).length;

    const bestOverallStreak = tasks.length > 0
        ? Math.max(...tasks.map(task => task.streakMax || 0))
        : 0;
    // Calculate statistics
    // const totalActiveStreaks = tasks.reduce((sum, task) => sum + task.streakCurrent, 0);
    // const tasksCompletedToday = tasks.filter(task => {
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0);

    //     return task.completedDates?.some(date => {
    //         const completedDate = new Date(date);
    //         completedDate.setHours(0, 0, 0, 0);
    //         return completedDate.getTime() === today.getTime();
    //     });
    // }).length;

    // const bestOverallStreak = tasks.length > 0 ? Math.max(...tasks.map(task => task.streakMax)) : 0;

    // Fetch tasks when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchTasks();
        }
    }, [isAuthenticated, fetchTasks]);

    // Show loading while checking authentication
    if (loading) {
        return (
            <div>
                <Header />
                <LoadingSpinner />
            </div>
        );
    }

    // Show error page
    if (error) {
        return (
            <div>
                <Header />
                <ErrorMessage
                    error={error}
                    onRetry={fetchTasks}
                    title="Failed to Load Tasks"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Header />

            <div className="container mx-auto px-4 py-8">
                {/* Welcome Message */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome back, {user?.username}! 👋
                    </h2>
                    <p className="text-xl text-gray-600">
                        Keep building those habits and tracking your progress
                    </p>
                </div>

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

                    {/* Task Creation Section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Basic Task Form */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Create Basic Task</h3>
                            <AddTaskForm onAdd={addTask} />
                        </div>

                        {/* Premium Task Creator */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Create Premium Task</h3>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                                <div className="text-center">
                                    <div className="text-4xl mb-3">⭐</div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                        Step-by-Step Tasks
                                    </h4>
                                    <p className="text-gray-600 mb-4">
                                        Create tasks with multiple steps, time tracking, and rewards
                                    </p>
                                    <button
                                        onClick={() => setShowPremiumCreator(true)}
                                        disabled={!canAccessFeature}
                                        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${canAccessFeature
                                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {canAccessFeature ? 'Create Premium Task' : 'Upgrade to Premium'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tasks Grid */}
                    {tasks.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <TasksGrid
                            tasks={tasks}
                            onStepComplete={completeStep}
                            onTaskComplete={completeTask}
                            onDelete={deleteTask}
                        />
                    )}
                </div>

                {/* Premium Task Creator Modal */}
                {showPremiumCreator && (
                    <PremiumTaskCreator
                        onCreateTask={addPremiumTask}
                        onCancel={() => setShowPremiumCreator(false)}
                    />
                )}
            </div>
        </div>
    );
}
