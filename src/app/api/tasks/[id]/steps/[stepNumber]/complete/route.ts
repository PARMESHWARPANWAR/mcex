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