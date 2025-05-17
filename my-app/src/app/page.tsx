'use client';

import { HomePage } from './homePage/mainConten';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Auto-redirect only authenticated users to their dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard-doctor');
    }
  }, [isAuthenticated, router]);

  // For non-authenticated users, show the homepage
  if (!isAuthenticated) {
    return <HomePage />;
  }
  
  // Loading state while redirecting authenticated users
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}