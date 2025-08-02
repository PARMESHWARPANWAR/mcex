'use client';

import React from 'react';
import { ITask } from '@/types';
import { getDaysSinceCreation, InsightsList, MetricCard, MilestoneList, ProgressBar } from './TaskEditForm';

interface AnalyticsViewProps {
  task: ITask;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ task }) => {
  const calculateStats = () => {
    const totalDays = getDaysSinceCreation(task.createdAt);
    const completedDays = task.completedDates?.length || 0;
    const completionRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
    const averageStreakLength = completedDays > 0 ? Math.round((completedDays / Math.max(1, task.streakMax)) * 10) / 10 : 0;
    
    return {
      totalDays,
      completedDays,
      completionRate,
      averageStreakLength,
      missedDays: totalDays - completedDays,
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-8">
      {/* Performance Metrics */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Performance Metrics</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <MetricCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            description={`${stats.completedDays} out of ${stats.totalDays} days`}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          
          <MetricCard
            title="Consistency Score"
            value={stats.completionRate > 80 ? "Excellent" : stats.completionRate > 60 ? "Good" : "Needs Work"}
            description={`Based on ${stats.completionRate}% completion rate`}
            color="text-green-600"
            bgColor="bg-green-50"
          />
          
          <MetricCard
            title="Missed Days"
            value={stats.missedDays}
            description="Days without completion"
            color="text-red-600"
            bgColor="bg-red-50"
          />
        </div>
      </div>

      {/* Streak Analysis */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Streak Analysis</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Streak Progress</h4>
            <ProgressBar 
              current={task.streakCurrent} 
              max={task.streakMax} 
              label="Current vs Best Streak"
            />
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Next Milestones</h4>
            <MilestoneList currentStreak={task.streakCurrent} />
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Insights & Recommendations</h3>
        <InsightsList stats={stats} task={task} />
      </div>
    </div>
  );
};

export default AnalyticsView;
