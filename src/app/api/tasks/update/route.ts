// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import EnhancedTask from '@/models/EnhancedTask';
import { getUserFromToken } from '@/lib/middleware';
import { ApiResponse, ITask, CreateTaskData } from '@/types';
import { IEnhancedTask } from '@/types/premium';

// Union type for combined tasks
type CombinedTask = ITask | IEnhancedTask;

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<CombinedTask[]>>> {
  try {
    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get URL search params to check if user wants only specific type
    const { searchParams } = new URL(request.url);
    const taskType = searchParams.get('type'); // 'basic', 'premium', or null for all
    const includeInactive = searchParams.get('includeInactive') === 'true';

    let allTasks: CombinedTask[] = [];

    // Fetch basic tasks
    if (!taskType || taskType === 'basic') {
      const basicTasks = await Task.find({ 
        userId,
        ...(includeInactive ? {} : { isActive: { $ne: false } })
      })
      .sort({ createdAt: -1 })
      .lean<ITask[]>();
      
      // Add a taskType field to distinguish basic tasks
      const basicTasksWithType = basicTasks.map(task => ({
        ...task,
        taskType: 'basic' as const,
        isPremium: false
      }));
      
      allTasks.push(...basicTasksWithType);
    }

    // Fetch premium/enhanced tasks
    if (!taskType || taskType === 'premium') {
      const enhancedTasks = await EnhancedTask.find({ 
        userId,
        ...(includeInactive ? {} : { isActive: { $ne: false } })
      })
      .populate('collaborators', 'username email')
      .sort({ createdAt: -1 })
      .lean<IEnhancedTask[]>();
      
      // Add a taskType field to distinguish premium tasks
      const enhancedTasksWithType = enhancedTasks.map(task => ({
        ...task,
        taskType: 'premium' as const
      }));
      
      allTasks.push(...enhancedTasksWithType);
    }

    // Sort all tasks by creation date (most recent first)
    allTasks.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateB - dateA;
    });

    return NextResponse.json({ 
      success: true, 
      data: allTasks,
      meta: {
        total: allTasks.length,
        basicTasks: allTasks.filter(t => t.taskType === 'basic').length,
        premiumTasks: allTasks.filter(t => t.taskType === 'premium').length
      }
    });

  } catch (error) {
    console.error('Error fetching tasks:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
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
    console.error('Error creating task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}