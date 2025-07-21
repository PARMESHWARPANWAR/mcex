'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useCallback } from 'react';

export const useApiWithAuth = () => {
  const { logout } = useAuth();

  const apiCall = useCallback(async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    // Handle unauthorized responses
    if (response.status === 401) {
      logout();
      throw new Error('Session expired. Please login again.');
    }

    return response;
  }, [logout]);

  return { apiCall };
};
