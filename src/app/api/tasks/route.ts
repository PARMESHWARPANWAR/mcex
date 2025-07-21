import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import { getUserFromToken } from '@/lib/middleware';
import { ApiResponse, ITask, CreateTaskData } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<ITask[]>>> {
  try {
    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 }).lean<ITask[]>();
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<ITask>>> {
  try {
    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const taskData: CreateTaskData = await request.json();
    
    // Validate required fields
    if (!taskData.title?.trim() || !taskData.description?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const task = await Task.create({
      ...taskData,
      userId,
    });
    
    const taskResponse = await Task.findById(task._id).lean<ITask>();
    
    return NextResponse.json(
      { success: true, data: taskResponse },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}