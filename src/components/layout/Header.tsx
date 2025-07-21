'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2 mr-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Streak Tracker</h1>
        </div>

        {/* User Info & Logout */}
        {user && (
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;