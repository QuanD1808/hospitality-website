'use client';

import { HomePage } from './homePage/mainConten';
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  // Auto-redirect only authenticated users with specific roles to their dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      // Chuyển đổi role sang chữ hoa để so sánh nhất quán
      const userRole = typeof user.role === 'string' ? user.role.toUpperCase() : '';
      console.log('Home page - user role:', userRole);
      
      if (userRole === 'PHARMACIST') {
        router.push('/pharmacyPage');
      } else if (userRole === 'RECEPTIONIST') {
        router.push('/receptionistPage');
      } else if (userRole === 'DOCTOR') {
        router.push('/dashboard-doctor');
      }
      // Bệnh nhân (PATIENT) sẽ ở lại trang chủ
    }
  }, [isAuthenticated, user, router]);

  // Hiển thị trang chủ cho người dùng chưa xác thực và bệnh nhân (PATIENT)
  if (!isAuthenticated || (user && user.role.toUpperCase() === 'PATIENT')) {
    return <HomePage />;
  }
  
  // Loading state trong quá trình chuyển hướng các role khác
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}