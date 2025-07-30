import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import { getUserFromToken } from '@/lib/middleware';
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

    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    const todayDateString = new Date().toDateString(); // "Mon Jan 02 2024"
    const yesterdayDateString = new Date(Date.now() - 86400000).toDateString(); // "Sun Jan 01 2024"

    // Check if already completed today
    const alreadyCompletedToday = task.completedDates.some((date: Date) =>
      new Date(date).toDateString() === todayDateString
    );

    if (alreadyCompletedToday) {
      return NextResponse.json(
        { success: false, error: 'Task already completed today' },
        { status: 400 }
      );
    }

    // Add today's completion
    task.completedDates.push(new Date());

    // SIMPLE: Just compare date strings
    task.streakCurrent = task.streakLast &&
      new Date(task.streakLast).toDateString() === yesterdayDateString
      ? task.streakCurrent + 1
      : 1;
    // Update max streak
    if (task.streakCurrent > task.streakMax) {
      task.streakMax = task.streakCurrent;
    }

    task.streakLast = todayDateString;
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