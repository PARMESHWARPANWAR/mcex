import { NextRequest, NextResponse } from 'next/server';
import { STEP_TEMPLATES } from '@/types/premium';

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    success: true,
    data: STEP_TEMPLATES
  });
}

// Helper Functions
const checkAndAwardBadges = async (task: any, completedSteps: number) => {
  const badges = [];

  // First step badge
  if (completedSteps === 1 && !task.badges.find((b: any) => b.name === 'First Step')) {
    badges.push({
      name: 'First Step',
      description: 'Completed your first step!',
      icon: '🎯',
      rarity: 'common',
      condition: 'Complete first step',
      earnedAt: new Date()
    });
  }

  // All steps completed badge
  if (completedSteps === task.steps.length && !task.badges.find((b: any) => b.name === 'Task Master')) {
    badges.push({
      name: 'Task Master',
      description: 'Completed all steps in a task!',
      icon: '👑',
      rarity: 'rare',
      condition: 'Complete all steps',
      earnedAt: new Date()
    });
  }

  // Speed demon badge (all steps in under estimated time)
  const totalEstimatedTime = task.steps.reduce((sum: number, step: any) => sum + (step.estimatedMinutes || 0), 0);
  if (task.actualDuration && task.actualDuration < totalEstimatedTime * 0.8) {
    badges.push({
      name: 'Speed Demon',
      description: 'Completed task 20% faster than estimated!',
      icon: '⚡',
      rarity: 'epic',
      condition: 'Complete task 20% faster',
      earnedAt: new Date()
    });
  }

  task.badges.push(...badges);
  return badges;
};
