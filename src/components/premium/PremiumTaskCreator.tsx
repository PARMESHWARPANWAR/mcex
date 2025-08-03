'use client';

import React, { useState } from 'react';
import { STEP_TEMPLATES, TaskCategory, DifficultyLevel } from '@/types/premium';
import { FeatureToggle } from './FeatureToggle';

interface PremiumTaskCreatorProps {
  onCreateTask: (taskData: any) => Promise<void>;
  onCancel: () => void;
}

export const PremiumTaskCreator: React.FC<PremiumTaskCreatorProps> = ({ onCreateTask, onCancel }) => {
  const [step, setStep] = useState(1);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    isPremium: false,
    hasSteps: false,
    steps: [] as any[],
    category: TaskCategory.PERSONAL,
    difficulty: DifficultyLevel.MEDIUM,
    hasTimeTracking: false,
    hasReminders: false,
    reminderTimes: [] as string[],
    hasRewards: false
  });

  const handleTemplateSelect = (templateKey: string) => {
    const template = STEP_TEMPLATES[templateKey as keyof typeof STEP_TEMPLATES];
    setTaskData(prev => ({
      ...prev,
      title: template.name,
      description: `Complete all steps for ${template.name.toLowerCase()}`,
      hasSteps: true,
      isPremium: true,
      steps: template.steps.map((step, index) => ({
        stepNumber: index + 1,
        title: step.title,
        icon: step.icon,
        estimatedMinutes: step.estimatedMinutes,
        isRequired: true,
        isCompleted: false
      }))
    }));
    setStep(2);
  };

  const handleCustomSteps = () => {
    setTaskData(prev => ({ ...prev, hasSteps: true, isPremium: true }));
    setStep(2);
  };

  const addCustomStep = () => {
    const newStep = {
      stepNumber: taskData.steps.length + 1,
      title: '',
      description: '',
      estimatedMinutes: 5,
      isRequired: true,
      isCompleted: false,
      icon: '•'
    };
    setTaskData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const updateStep = (index: number, field: string, value: any) => {
    const updatedSteps = [...taskData.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setTaskData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const removeStep = (index: number) => {
    const updatedSteps = taskData.steps.filter((_, i) => i !== index);
    setTaskData(prev => ({ ...prev, steps: updatedSteps }));
  };

  const handleSubmit = async () => {
    try {
      await onCreateTask(taskData);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Premium Task
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Step 1: Template Selection */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Your Task Type</h3>
              
              {/* Template Options */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {Object.entries(STEP_TEMPLATES).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => handleTemplateSelect(key)}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-3xl">{template.icon}</span>
                      <h4 className="font-bold text-gray-800">{template.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {template.steps.length} steps • {template.steps.reduce((sum, s) => sum + (s.estimatedMinutes || 0), 0)} min total
                    </p>
                    <div className="text-xs text-blue-600">
                      {template.steps.slice(0, 3).map(s => s.title).join(' • ')}
                      {template.steps.length > 3 && '...'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Option */}
              <button
                onClick={handleCustomSteps}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">➕</div>
                  <h4 className="font-bold text-gray-800 mb-1">Create Custom Steps</h4>
                  <p className="text-sm text-gray-600">Build your own step-by-step task</p>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Task Configuration */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Configure Your Task</h3>
                
                {/* Basic Info */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={taskData.title}
                      onChange={(e) => setTaskData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      placeholder="Enter task title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={taskData.description}
                      onChange={(e) => setTaskData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                      rows={3}
                      placeholder="Describe your task"
                    />
                  </div>
                </div>

                {/* Steps Configuration */}
                {taskData.hasSteps && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800">Task Steps</h4>
                      <button
                        onClick={addCustomStep}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Add Step
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {taskData.steps.map((step, index) => (
                        <div key={index} className="p-4 border-2 border-gray-200 rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-gray-700">Step {index + 1}</span>
                            <button
                              onClick={() => removeStep(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => updateStep(index, 'title', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                              placeholder="Step title"
                            />
                            <input
                              type="number"
                              value={step.estimatedMinutes}
                              onChange={(e) => updateStep(index, 'estimatedMinutes', parseInt(e.target.value))}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                              placeholder="Minutes"
                              min="1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Premium Features */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={taskData.category}
                      onChange={(e) => setTaskData(prev => ({ ...prev, category: e.target.value as TaskCategory }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    >
                      {Object.values(TaskCategory).map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={taskData.difficulty}
                      onChange={(e) => setTaskData(prev => ({ ...prev, difficulty: e.target.value as DifficultyLevel }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                    >
                      {Object.values(DifficultyLevel).map(diff => (
                        <option key={diff} value={diff}>
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Feature Toggles */}
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-gray-800">Premium Features</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FeatureToggle
                      label="Time Tracking"
                      description="Track time spent on each step"
                      enabled={taskData.hasTimeTracking}
                      onChange={(enabled) => setTaskData(prev => ({ ...prev, hasTimeTracking: enabled }))}
                      icon="⏱️"
                    />
                    
                    <FeatureToggle
                      label="Smart Reminders"
                      description="Get reminded at optimal times"
                      enabled={taskData.hasReminders}
                      onChange={(enabled) => setTaskData(prev => ({ ...prev, hasReminders: enabled }))}
                      icon="⏰"
                    />
                    
                    <FeatureToggle
                      label="Reward Points"
                      description="Earn points and badges"
                      enabled={taskData.hasRewards}
                      onChange={(enabled) => setTaskData(prev => ({ ...prev, hasRewards: enabled }))}
                      icon="🏆"
                    />
                    
                    <FeatureToggle
                      label="Daily Notes"
                      description="Add reflection notes"
                      enabled={false}
                      onChange={() => {}}
                      icon="📝"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6 border-t">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!taskData.title.trim() || !taskData.description.trim()}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Premium Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const TrashIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const XIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);