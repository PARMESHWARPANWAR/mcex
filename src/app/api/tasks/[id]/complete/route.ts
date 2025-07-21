import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import { ApiResponse, ITask } from '@/types';
import { calculateStreakData } from '@/lib/taskHelpers';
import { Types } from 'mongoose';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ITask>>> {
  try {
    const { id } = await params;
    
    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid task ID' },
        { status: 400 }
      );
    }

    await dbConnect();
    const task = await Task.findById(id);
    
    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed today
    const alreadyCompletedToday = task.completedDates.some((date: Date) => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.getTime() === today.getTime();
    });

    if (alreadyCompletedToday) {
      return NextResponse.json(
        { success: false, error: 'Task already completed today' },
        { status: 400 }
      );
    }

    // Add today to completed dates
    task.completedDates.push(today);

    // Calculate new streak
    const { streakCurrent } = calculateStreakData(
      [...task.completedDates], 
      task.streakLast
    );
    
    task.streakCurrent = streakCurrent;

    // Update max streak
    if (task.streakCurrent > task.streakMax) {
      task.streakMax = task.streakCurrent;
    }

    task.streakLast = today;
    await task.save();

    // Return lean object
    const updatedTask = await Task.findById(id).lean<ITask>();
    return NextResponse.json({ success: true, data: updatedTask! });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}
