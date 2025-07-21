'use client';

import React, { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import { AddTaskFormProps } from '@/types';

interface FormErrors {
  title?: string;
  description?: string;
  submit?: string;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  // Form state
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Character limits
  const TITLE_MAX_LENGTH = 100;
  const DESCRIPTION_MAX_LENGTH = 500;

  // Validation rules
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (title.trim().length > TITLE_MAX_LENGTH) {
      newErrors.title = `Title must be ${TITLE_MAX_LENGTH} characters or less`;
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (description.trim().length > DESCRIPTION_MAX_LENGTH) {
      newErrors.description = `Description must be ${DESCRIPTION_MAX_LENGTH} characters or less`;
    }

    return newErrors;
  }, [title, description, TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH]);

  // Real-time validation
  const clearFieldError = (field: keyof FormErrors): void => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validate form
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onAdd({ 
        title: title.trim(), 
        description: description.trim() 
      });
      
      // Reset form on success
      setTitle('');
      setDescription('');
      setIsExpanded(false);
      
      // Success feedback (could be replaced with toast notification)
      console.log('Task added successfully!');
      
    } catch (error) {
      console.error('Error adding task:', error);
      
      // Set submit error
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to add task. Please try again.';
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setTitle(value);
    clearFieldError('title');
    
    // Auto-expand form when user starts typing
    if (!isExpanded && value.length > 0) {
      setIsExpanded(true);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setDescription(value);
    clearFieldError('description');
  };

  // Form validation state
  const isFormValid = title.trim().length >= 3 && description.trim().length >= 10;
  const titleCharacterCount = title.length;
  const descriptionCharacterCount = description.length;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 sm:p-8 mb-8 animate-slide-in">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-3 mr-4 shadow-md">
          <PlusIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Add New Task
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Create a new habit to track your progress
          </p>
        </div>
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <ErrorIcon className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 font-medium">{errors.submit}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label 
            htmlFor="task-title" 
            className="block text-sm font-semibold text-gray-700 mb-3"
          >
            Task Title *
          </label>
          <div className="relative">
            <input
              type="text"
              id="task-title"
              value={title}
              onChange={handleTitleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/50 ${
                errors.title
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              }`}
              placeholder="e.g., Daily Exercise, Read for 30 minutes"
              maxLength={TITLE_MAX_LENGTH}
              aria-describedby={errors.title ? "title-error" : "title-help"}
              aria-invalid={!!errors.title}
            />
            
            {/* Character Counter */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className={`text-xs ${
                titleCharacterCount > TITLE_MAX_LENGTH * 0.8 
                  ? 'text-orange-500' 
                  : 'text-gray-400'
              }`}>
                {titleCharacterCount}/{TITLE_MAX_LENGTH}
              </span>
            </div>
          </div>
          
          {/* Error Message */}
          {errors.title && (
            <p id="title-error" className="mt-2 text-sm text-red-600 flex items-center">
              <ErrorIcon className="w-4 h-4 mr-1" />
              {errors.title}
            </p>
          )}
          
          {/* Help Text */}
          {!errors.title && (
            <p id="title-help" className="mt-2 text-sm text-gray-500">
              Choose a clear, specific title for your habit
            </p>
          )}
        </div>

        {/* Description Field - Show when expanded or has content */}
        <div className={`transition-all duration-300 ${
          isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          <label 
            htmlFor="task-description" 
            className="block text-sm font-semibold text-gray-700 mb-3"
          >
            Description *
          </label>
          <div className="relative">
            <textarea
              id="task-description"
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-200 bg-white/50 resize-none ${
                errors.description
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              }`}
              placeholder="Describe what you want to achieve with this task..."
              maxLength={DESCRIPTION_MAX_LENGTH}
              aria-describedby={errors.description ? "description-error" : "description-help"}
              aria-invalid={!!errors.description}
            />
            
            {/* Character Counter */}
            <div className="absolute right-3 bottom-3">
              <span className={`text-xs ${
                descriptionCharacterCount > DESCRIPTION_MAX_LENGTH * 0.8 
                  ? 'text-orange-500' 
                  : 'text-gray-400'
              }`}>
                {descriptionCharacterCount}/{DESCRIPTION_MAX_LENGTH}
              </span>
            </div>
          </div>
          
          {/* Error Message */}
          {errors.description && (
            <p id="description-error" className="mt-2 text-sm text-red-600 flex items-center">
              <ErrorIcon className="w-4 h-4 mr-1" />
              {errors.description}
            </p>
          )}
          
          {/* Help Text */}
          {!errors.description && (
            <p id="description-help" className="mt-2 text-sm text-gray-500">
              Explain the details and benefits of this habit
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting || !isFormValid
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
          }`}
          aria-label={
            isSubmitting 
              ? 'Adding task...' 
              : isFormValid 
              ? 'Add new task' 
              : 'Fill in all required fields to add task'
          }
        >
          <ButtonContent 
            isSubmitting={isSubmitting}
            isFormValid={isFormValid}
          />
        </button>

        {/* Form Progress Indicator */}
        {isExpanded && (
          <div className="text-center">
            <div className="flex justify-center space-x-2">
              <div className={`w-2 h-2 rounded-full transition-colors ${
                title.trim().length >= 3 ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${
                description.trim().length >= 10 ? 'bg-green-500' : 'bg-gray-300'
              }`} />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {!isFormValid ? 'Complete all fields to add task' : 'Ready to add task'}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

// Button Content Component
interface ButtonContentProps {
  isSubmitting: boolean;
  isFormValid: boolean;
}

const ButtonContent: React.FC<ButtonContentProps> = ({ isSubmitting, isFormValid }) => {
  if (isSubmitting) {
    return (
      <span className="flex items-center justify-center">
        <LoadingSpinner className="w-5 h-5 mr-2" />
        Adding Task...
      </span>
    );
  }

  return (
    <span className="flex items-center justify-center">
      <PlusIcon className="w-5 h-5 mr-2" />
      {isFormValid ? 'Add Task' : 'Fill Required Fields'}
    </span>
  );
};

// Icon Components
interface IconProps {
  className: string;
}

const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ErrorIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
);

const LoadingSpinner: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={`${className} animate-spin`}
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth={4}
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default AddTaskForm;