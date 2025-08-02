import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import StreakEntry from '@/models/StreakEntry';
import { getUserFromToken } from '@/lib/middleware';
import { ApiResponse, CompletionStatus, ITaskEnhanced, TaskAnalytics } from '@/types';
import { Types } from 'mongoose';

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

// Helper functions
const calculateTaskAnalytics = (streakEntries: any[]): TaskAnalytics => {
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

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ITaskEnhanced>>> {
  try {
    const { id } = await params;
    
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get task with streak entries
    const task = await Task.findOne({ _id: id, userId }).lean();
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    // Get all streak entries for this task
    const streakEntries = await StreakEntry.find({ taskId: id, userId })
      .sort({ date: -1 })
      .lean();

    // Calculate analytics
    const analytics = calculateTaskAnalytics(streakEntries);

    const enhancedTask: ITaskEnhanced = {
      ...task,
      streakEntries,
      analytics,
    };

    return NextResponse.json({ success: true, data: enhancedTask });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}