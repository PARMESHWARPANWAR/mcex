// app/api/tasks/premium/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import EnhancedTask from '@/models/EnhancedTask';
import { getUserFromToken } from '@/lib/middleware';
// import { SubscriptionService } from '@/lib/subscription';
import { ApiResponse } from '@/types';
import { 
  IEnhancedTask,
  TaskCategory, 
  DifficultyLevel,
  STEP_TEMPLATES
} from '@/types/premium';
// import { SubscriptionPlan } from '@/components/premium/SubscriptionCode';

export enum SubscriptionPlan {
  FREE = 'free',
  PREMIUM = 'premium',
  PRO = 'pro'
}


interface CreatePremiumTaskRequest {
  // Basic task info
  title: string;
  description: string;
  
  // Premium features
  isPremium: boolean;
  hasSteps: boolean;
  steps?: Array<{
    stepNumber: number;
    title: string;
    description?: string;
    estimatedMinutes?: number;
    icon?: string;
    isRequired?: boolean;
  }>;
  
  // Template selection
  templateId?: string;
  
  // Categorization
  hasCategories: boolean;
  category?: TaskCategory;
  
  // Difficulty
  hasDifficulty: boolean;
  difficulty?: DifficultyLevel;
  
  // Time tracking
  hasTimeTracking: boolean;
  estimatedDuration?: number;
  
  // Reminders
  hasReminders: boolean;
  reminderTimes?: string[];
  
  // Rewards
  hasRewards: boolean;
  
  // Goals
  hasSubgoals: boolean;
  weeklyTarget?: number;
  monthlyTarget?: number;
  
  // Notes
  hasNotes: boolean;
  
  // Collaboration
  hasCollaborative: boolean;
  collaborators?: string[];
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<IEnhancedTask>>> {
  try {
    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const taskData: CreatePremiumTaskRequest = await request.json();
    
    // Validate basic required fields
    if (!taskData.title?.trim() || !taskData.description?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Get user subscription and features
    // const subscription = await SubscriptionService.getUserSubscription(userId);
    // const userFeatures = SubscriptionService.getUserFeatures(subscription);
    const subscription = {plan:'pro'}
    const userFeatures = {maxTasks: 10, hasSteps: true, hasTimeTracking: true, hasReminders: true, hasRewards: true, hasCollaboration: true};

    // Validate premium access
    if (taskData.isPremium && subscription.plan === SubscriptionPlan.FREE) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Premium subscription required',
          upgrade: true,
          requiredPlan: SubscriptionPlan.PREMIUM
        },
        { status: 403 }
      );
    }

    // Check task limits
    const currentTaskCount = await EnhancedTask.countDocuments({ userId, isActive: true });
    // const canCreateTask = await SubscriptionService.checkTaskLimit(userId, currentTaskCount);
    const canCreateTask = true
    
    if (!canCreateTask) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Task limit reached',
          upgrade: true,
          currentCount: currentTaskCount,
          maxAllowed: userFeatures.maxTasks
        },
        { status: 403 }
      );
    }

    // Validate individual premium features
    const featureValidation = validatePremiumFeatures(taskData, userFeatures);
    if (!featureValidation.valid) {
      return NextResponse.json(
        { 
          success: false, 
          error: featureValidation.error,
          upgrade: true,
          requiredFeature: featureValidation.requiredFeature
        },
        { status: 403 }
      );
    }

    // Process template if specified
    let processedSteps = taskData.steps || [];
    if (taskData.templateId && STEP_TEMPLATES[taskData.templateId as keyof typeof STEP_TEMPLATES]) {
      const template = STEP_TEMPLATES[taskData.templateId as keyof typeof STEP_TEMPLATES];
      processedSteps = template.steps.map((step, index) => ({
        stepNumber: index + 1,
        title: step.title,
        description: step.title,
        estimatedMinutes: step.estimatedMinutes,
        icon: step.icon,
        isRequired: true,
        isCompleted: false
      }));
      
      // Override title if using template
      if (!taskData.title.trim() || taskData.title === template.name) {
        taskData.title = template.name;
      }
    }

    // Validate steps if hasSteps is true
    if (taskData.hasSteps) {
      const stepsValidation = validateSteps(processedSteps);
      if (!stepsValidation.valid) {
        return NextResponse.json(
          { success: false, error: stepsValidation.error },
          { status: 400 }
        );
      }
    }

    // Calculate initial step progress
    const stepProgress = taskData.hasSteps ? {
      completed: 0,
      total: processedSteps.length,
      percentage: 0
    } : undefined;

    // Validate reminder times format
    if (taskData.hasReminders && taskData.reminderTimes) {
      const timeValidation = validateReminderTimes(taskData.reminderTimes);
      if (!timeValidation.valid) {
        return NextResponse.json(
          { success: false, error: timeValidation.error },
          { status: 400 }
        );
      }
    }

    // Validate collaborators (Pro feature)
    if (taskData.hasCollaborative && taskData.collaborators?.length) {
      if (!userFeatures.hasCollaboration) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Collaboration requires Pro subscription',
            upgrade: true,
            requiredPlan: SubscriptionPlan.PRO
          },
          { status: 403 }
        );
      }
      
      // Validate collaborator user IDs exist
      const collaboratorValidation = await validateCollaborators(taskData.collaborators);
      if (!collaboratorValidation.valid) {
        return NextResponse.json(
          { success: false, error: collaboratorValidation.error },
          { status: 400 }
        );
      }
    }

    // Create the enhanced task
    const taskPayload = {
      // Basic fields
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      userId,
      
      // Premium features
      isPremium: taskData.isPremium,
      
      // Steps
      hasSteps: taskData.hasSteps,
      steps: taskData.hasSteps ? processedSteps : [],
      stepProgress,
      
      // Time tracking
      hasTimeTracking: taskData.hasTimeTracking && userFeatures.hasTimeTracking,
      estimatedDuration: taskData.estimatedDuration,
      
      // Reminders
      hasReminders: taskData.hasReminders && userFeatures.hasReminders,
      reminderTimes: taskData.hasReminders ? taskData.reminderTimes : [],
      
      // Goals
      hasSubgoals: taskData.hasSubgoals,
      weeklyTarget: taskData.weeklyTarget,
      monthlyTarget: taskData.monthlyTarget,
      
      // Gamification
      hasRewards: taskData.hasRewards && userFeatures.hasRewards,
      rewardPoints: 0,
      badges: [],
      
      // Notes
      hasNotes: taskData.hasNotes,
      dailyNotes: [],
      
      // Categorization
      hasCategories: taskData.hasCategories,
      category: taskData.category,
      
      // Difficulty
      hasDifficulty: taskData.hasDifficulty,
      difficulty: taskData.difficulty || DifficultyLevel.MEDIUM,
      
      // Collaboration
      hasCollaborative: taskData.hasCollaborative && userFeatures.hasCollaboration,
      collaborators: taskData.hasCollaborative ? taskData.collaborators : [],
      
      // Templates
      hasTemplates: taskData.templateId ? true : false,
      templateId: taskData.templateId,
      
      // Basic streak info
      streakCurrent: 0,
      streakMax: 0,
      streakLast: null,
      completedDates: [],
      isActive: true
    };

    const task = await EnhancedTask.create(taskPayload);
    const createdTask = await EnhancedTask.findById(task._id)
      .populate('collaborators', 'username email')
      .lean<IEnhancedTask>();

    // Award achievement for creating first premium task
    if (taskData.isPremium) {
      await awardFirstPremiumTaskBadge(userId);
    }

    // Send notifications to collaborators if any
    if (taskData.hasCollaborative && taskData.collaborators?.length) {
      await notifyCollaborators(taskData.collaborators, createdTask, userId);
    }

    return NextResponse.json({
      success: true,
      data: createdTask,
      message: taskData.isPremium ? 'Premium task created successfully!' : 'Task created successfully!'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating premium task:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: `Failed to create task: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch premium task templates and user limits
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<any>>> {
  try {
    await dbConnect();
    
    const userId = getUserFromToken(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user subscription and features
    // const subscription = await SubscriptionService.getUserSubscription(userId);
    // const userFeatures = SubscriptionService.getUserFeatures(subscription);
    const subscription = {plan:'pro',status:'active',currentPeriodEnd:new Date()};

    const userFeatures = {maxTasks: 10, hasSteps: true, hasTimeTracking: true, hasReminders: true, hasRewards: true, hasCollaboration: true};


    // Get current task count
    const currentTaskCount = await EnhancedTask.countDocuments({ userId, isActive: true });
    const premiumTaskCount = await EnhancedTask.countDocuments({ userId, isPremium: true, isActive: true });

    // Filter templates based on user subscription
    const availableTemplates = subscription.plan !== SubscriptionPlan.FREE 
      ? STEP_TEMPLATES 
      : {};

    return NextResponse.json({
      success: true,
      data: {
        templates: availableTemplates,
        userLimits: {
          currentTasks: currentTaskCount,
          maxTasks: userFeatures.maxTasks,
          premiumTasks: premiumTaskCount,
          canCreateMore: userFeatures.maxTasks === -1 || currentTaskCount < userFeatures.maxTasks
        },
        userFeatures,
        subscription: {
          plan: subscription.plan,
          status: subscription.status,
          currentPeriodEnd: subscription.currentPeriodEnd
        },
        categories: Object.values(TaskCategory),
        difficulties: Object.values(DifficultyLevel)
      }
    });

  } catch (error) {
    console.error('Error fetching premium task data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch task data' },
      { status: 500 }
    );
  }
}

// Validation Functions
function validatePremiumFeatures(taskData: CreatePremiumTaskRequest, userFeatures: any) {
  const checks = [
    {
      condition: taskData.hasSteps && !userFeatures.hasSteps,
      error: 'Step-based tasks require Premium subscription',
      feature: 'hasSteps'
    },
    {
      condition: taskData.hasTimeTracking && !userFeatures.hasTimeTracking,
      error: 'Time tracking requires Premium subscription',
      feature: 'hasTimeTracking'
    },
    {
      condition: taskData.hasReminders && !userFeatures.hasReminders,
      error: 'Smart reminders require Premium subscription',
      feature: 'hasReminders'
    },
    {
      condition: taskData.hasRewards && !userFeatures.hasRewards,
      error: 'Reward system requires Premium subscription',
      feature: 'hasRewards'
    },
    {
      condition: taskData.hasCollaborative && !userFeatures.hasCollaboration,
      error: 'Collaboration features require Pro subscription',
      feature: 'hasCollaboration'
    }
  ];

  for (const check of checks) {
    if (check.condition) {
      return {
        valid: false,
        error: check.error,
        requiredFeature: check.feature
      };
    }
  }

  return { valid: true };
}

function validateSteps(steps: any[]) {
  if (!steps || steps.length === 0) {
    return {
      valid: false,
      error: 'At least one step is required for step-based tasks'
    };
  }

  if (steps.length > 20) {
    return {
      valid: false,
      error: 'Maximum 20 steps allowed per task'
    };
  }

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    
    if (!step.title?.trim()) {
      return {
        valid: false,
        error: `Step ${i + 1} title is required`
      };
    }
    
    if (step.title.length > 100) {
      return {
        valid: false,
        error: `Step ${i + 1} title too long (max 100 characters)`
      };
    }
    
    if (step.estimatedMinutes && (step.estimatedMinutes < 1 || step.estimatedMinutes > 1440)) {
      return {
        valid: false,
        error: `Step ${i + 1} estimated time must be between 1 and 1440 minutes`
      };
    }
  }

  return { valid: true };
}

function validateReminderTimes(reminderTimes: string[]) {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
  if (reminderTimes.length > 10) {
    return {
      valid: false,
      error: 'Maximum 10 reminder times allowed'
    };
  }

  for (const time of reminderTimes) {
    if (!timeRegex.test(time)) {
      return {
        valid: false,
        error: `Invalid time format: ${time}. Use HH:MM format (e.g., 09:30)`
      };
    }
  }

  return { valid: true };
}

async function validateCollaborators(collaboratorIds: string[]) {
  try {
    if (collaboratorIds.length > 10) {
      return {
        valid: false,
        error: 'Maximum 10 collaborators allowed per task'
      };
    }

    // Check if all collaborator IDs exist
    const User = require('@/models/User').default;
    const existingUsers = await User.find({ 
      _id: { $in: collaboratorIds } 
    }).select('_id');

    if (existingUsers.length !== collaboratorIds.length) {
      return {
        valid: false,
        error: 'One or more collaborator user IDs are invalid'
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: 'Failed to validate collaborators'
    };
  }
}

// Helper Functions
async function awardFirstPremiumTaskBadge(userId: string) {
  try {
    const existingPremiumTasks = await EnhancedTask.countDocuments({ 
      userId, 
      isPremium: true 
    });

    if (existingPremiumTasks === 1) { // First premium task
      // Award badge logic here
      console.log(`Awarding first premium task badge to user ${userId}`);
      // Could integrate with a badge/achievement system
    }
  } catch (error) {
    console.error('Error awarding badge:', error);
  }
}

async function notifyCollaborators(collaboratorIds: string[], task: any, creatorId: string) {
  try {
    // Email notification logic here
    console.log(`Notifying ${collaboratorIds.length} collaborators about new task: ${task.title}`);
    
    // Example: Send email notifications
    // const emailService = new EmailService();
    // await emailService.sendTaskInvitations(collaboratorIds, task, creatorId);
    
  } catch (error) {
    console.error('Error notifying collaborators:', error);
  }
}
