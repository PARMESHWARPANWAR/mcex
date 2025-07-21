'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser, AuthResponse, LoginData, CreateUserData } from '@/types';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (loginData: LoginData) => Promise<void>;
  register: (userData: CreateUserData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Get token from localStorage
  const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  // Set token in localStorage and headers
  const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  };

  // Remove token from localStorage
  const removeToken = (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  };

  // API call with auth header
  const apiCall = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = getToken();
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });
  };

  // Check if user is authenticated
  const checkAuth = async (): Promise<void> => {
    try {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await apiCall('/api/auth/me');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        } else {
          removeToken();
        }
      } else {
        removeToken();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      removeToken();
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (loginData: LoginData): Promise<void> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const data: AuthResponse = await response.json();

    if (data.success && data.user && data.token) {
      setToken(data.token);
      setUser(data.user);
    } else {
      throw new Error(data.error || 'Login failed');
    }
  };

  // Register function
  const register = async (userData: CreateUserData): Promise<void> => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data: AuthResponse = await response.json();

    if (data.success && data.user && data.token) {
      setToken(data.token);
      setUser(data.user);
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  };

  // Logout function
  const logout = (): void => {
    removeToken();
    setUser(null);
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
