import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import EnhancedTask from '@/models/EnhancedTask';
import { getUserFromToken } from '@/lib/middleware';
import { ApiResponse, ITask } from '@/types';
import { IEnhancedTask } from '@/types/premium';

// Union type for combined tasks
type CombinedTask = (ITask & { taskType: 'basic'; isPremium: false }) | 
                   (IEnhancedTask & { taskType: 'premium' });

interface TasksResponse {
  tasks: CombinedTask[];
  summary: {
    total: number;
    basic: number;
    premium: number;
    completed: number;
    active: number;
    categories: Record<string, number>;
  };
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<TasksResponse>>> {
  try {
    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status'); // 'completed', 'active', 'all'
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'createdAt'; // 'createdAt', 'updatedAt', 'title'
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

    // Build filter conditions
    const baseFilter: any = { userId };
    
    if (status === 'completed') {
      baseFilter.isCompleted = true;
    } else if (status === 'active') {
      baseFilter.$or = [
        { isCompleted: false },
        { isCompleted: { $exists: false } }
      ];
    }

    // Fetch basic tasks
    const basicTasksQuery = Task.find(baseFilter);
    if (category) {
      basicTasksQuery.where('category').equals(category);
    }
    
    const basicTasks = await basicTasksQuery
      .sort({ [sortBy]: sortOrder })
      .skip(offset)
      .limit(Math.ceil(limit / 2)) // Split limit between basic and premium
      .lean<ITask[]>();

    // Fetch enhanced/premium tasks
    const enhancedTasksQuery = EnhancedTask.find(baseFilter);
    if (category) {
      enhancedTasksQuery.where('category').equals(category);
    }

    const enhancedTasks = await enhancedTasksQuery
      .populate('collaborators', 'username email')
      .sort({ [sortBy]: sortOrder })
      .skip(offset)
      .limit(Math.ceil(limit / 2))
      .lean<IEnhancedTask[]>();

    // Transform and combine tasks
    const basicTasksWithType: CombinedTask[] = basicTasks.map(task => ({
      ...task,
      taskType: 'basic' as const,
      isPremium: false
    }));

    const enhancedTasksWithType: CombinedTask[] = enhancedTasks.map(task => ({
      ...task,
      taskType: 'premium' as const
    }));

    // Combine and sort all tasks
    const allTasks = [...basicTasksWithType, ...enhancedTasksWithType];
    allTasks.sort((a, b) => {
      const aValue = a[sortBy as keyof CombinedTask] || 0;
      const bValue = b[sortBy as keyof CombinedTask] || 0;
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        const dateA = new Date(aValue as string).getTime();
        const dateB = new Date(bValue as string).getTime();
        return sortOrder === 1 ? dateA - dateB : dateB - dateA;
      }
      
      return sortOrder === 1 ? 
        String(aValue).localeCompare(String(bValue)) : 
        String(bValue).localeCompare(String(aValue));
    });

    // Calculate summary statistics
    const completed = allTasks.filter(task => task.isCompleted).length;
    const active = allTasks.length - completed;
    
    // Category breakdown
    const categories: Record<string, number> = {};
    allTasks.forEach(task => {
      if (task.category) {
        categories[task.category] = (categories[task.category] || 0) + 1;
      }
    });

    const response: TasksResponse = {
      tasks: allTasks.slice(0, limit), // Apply final limit
      summary: {
        total: allTasks.length,
        basic: basicTasksWithType.length,
        premium: enhancedTasksWithType.length,
        completed,
        active,
        categories
      }
    };

    return NextResponse.json({
      success: true,
      data: response,
      pagination: {
        limit,
        offset,
        hasMore: allTasks.length > limit + offset
      }
    });

  } catch (error) {
    console.error('Error fetching all tasks:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Optional: Add a POST endpoint for bulk operations
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<any>>> {
  try {
    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { action, taskIds, data } = await request.json();

    switch (action) {
      case 'bulk_complete':
        // Complete multiple tasks
        const basicUpdates = Task.updateMany(
          { _id: { $in: taskIds }, userId },
          { isCompleted: true, completedAt: new Date() }
        );
        
        const premiumUpdates = EnhancedTask.updateMany(
          { _id: { $in: taskIds }, userId },
          { isCompleted: true, completedAt: new Date() }
        );

        await Promise.all([basicUpdates, premiumUpdates]);
        
        return NextResponse.json({
          success: true,
          message: `${taskIds.length} tasks marked as completed`
        });

      case 'bulk_delete':
        // Soft delete multiple tasks
        const basicDeletes = Task.updateMany(
          { _id: { $in: taskIds }, userId },
          { isActive: false, deletedAt: new Date() }
        );
        
        const premiumDeletes = EnhancedTask.updateMany(
          { _id: { $in: taskIds }, userId },
          { isActive: false, deletedAt: new Date() }
        );

        await Promise.all([basicDeletes, premiumDeletes]);
        
        return NextResponse.json({
          success: true,
          message: `${taskIds.length} tasks deleted`
        });

      case 'bulk_update_category':
        // Update category for multiple tasks
        const basicCategoryUpdate = Task.updateMany(
          { _id: { $in: taskIds }, userId },
          { category: data.category }
        );
        
        const premiumCategoryUpdate = EnhancedTask.updateMany(
          { _id: { $in: taskIds }, userId },
          { category: data.category }
        );

        await Promise.all([basicCategoryUpdate, premiumCategoryUpdate]);
        
        return NextResponse.json({
          success: true,
          message: `${taskIds.length} tasks updated`
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid bulk action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in bulk operation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}