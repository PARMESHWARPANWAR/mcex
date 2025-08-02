import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import StreakEntry from '@/models/StreakEntry';
import { getUserFromToken } from '@/lib/middleware';
import { ApiResponse, ITask } from '@/types';
import { CompletionStatus, MoodType, EffortLevel } from '@/types/streak';
import { Types } from 'mongoose';



const calculateStreakDayNumber = async (taskId: string, userId: string, today: Date): Promise<number> => {
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

const determinePremiumStatus = (streakDayNumber: number, requestData: any): boolean => {
  // Premium conditions:
  // 1. Every 7th day of a streak
  // 2. High effort completions
  // 3. Milestone days (30, 60, 90, etc.)
  
  if (streakDayNumber % 7 === 0) return true;
  if (requestData.effort === EffortLevel.HIGH) return true;
  if ([30, 60, 90, 180, 365].includes(streakDayNumber)) return true;
  
  return false;
};

interface CompleteTaskRequest {
  notes?: string;
  mood?: MoodType;
  effort?: EffortLevel;
  status?: CompletionStatus;
}

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<ITask>>> {
  try {
    const { id } = await params;
    const requestData: CompleteTaskRequest = await request.json();
    
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed today
    const existingEntry = await StreakEntry.findOne({
      taskId: id,
      userId,
      date: today,
    });

    if (existingEntry) {
      return NextResponse.json(
        { success: false, error: 'Task already completed today' },
        { status: 400 }
      );
    }

    // Calculate streak day number
    const streakDayNumber = await calculateStreakDayNumber(id, userId, today);
    
    // Determine if this is a premium completion
    const isPremium = determinePremiumStatus(streakDayNumber, requestData);

    // Create streak entry
    await StreakEntry.create({
      taskId: id,
      userId,
      date: today,
      completedAt: new Date(),
      status: requestData.status || CompletionStatus.COMPLETED,
      isPremium,
      streakDayNumber,
      notes: requestData.notes,
      mood: requestData.mood,
      effort: requestData.effort,
    });

    // Update task streak info
    task.streakCurrent = streakDayNumber;
    if (streakDayNumber > task.streakMax) {
      task.streakMax = streakDayNumber;
    }
    task.streakLast = today;
    await task.save();

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
