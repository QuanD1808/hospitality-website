'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Dashboard } from './Dashboard';

export default function PharmacyPage() {
  const { user, isAuthenticated, token, logout } = useAuth();
  const router = useRouter();

  // Add debug logging
  console.log('PharmacyPage: Rendering page component');
  console.log('PharmacyPage: Authentication state:', {
    isAuthenticated,
    hasUser: !!user,
    userRole: user?.role || 'none',
    hasToken: !!token,
  });

  useEffect(() => {
    console.log('PharmacyPage: Authentication check effect running');

    if (!isAuthenticated) {
      console.log('PharmacyPage: Not authenticated, redirecting to login');
      router.push('/login');
    } else if (user?.role !== 'PHARMACIST') {
      // Nếu người dùng không phải là dược sĩ, chuyển hướng về trang đăng nhập
      console.log(`PharmacyPage: User role ${user?.role} is not PHARMACIST, logging out`);
      logout();
      router.push('/login');
    } else {
      console.log('PharmacyPage: Authentication check passed');
    }
  }, [isAuthenticated, router, user, logout]);

  if (!isAuthenticated || !user) {
    console.log('PharmacyPage: Rendering loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  console.log('PharmacyPage: Rendering Dashboard with user:', user.fullName);
  console.log('PharmacyPage: Token available:', !!token);

  // If token is available, store it in localStorage for API calls
  if (token) {
    console.log('PharmacyPage: Saving token to localStorage for API calls');
    localStorage.setItem('token', token);
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Dashboard user={user} onLogout={logout} />
    </div>
  );
}