'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Dashboard } from './Dashboard';

export default function PharmacyPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user?.role !== 'PHARMACIST') {
      // Nếu người dùng không phải là dược sĩ, chuyển hướng về trang đăng nhập
      logout();
      router.push('/login');
    }
  }, [isAuthenticated, router, user, logout]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <Dashboard user={user} onLogout={logout} />
    </div>
  );
}