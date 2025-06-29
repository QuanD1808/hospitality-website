'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { UserIcon, ChevronLeftIcon } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('Login page - isAuthenticated:', isAuthenticated);
    console.log('Login page - user data:', user);
    
    if (isAuthenticated && user) {
      // Kiểm tra và log role trước khi chuyển hướng
      console.log('Login page - user role:', user.role);
      console.log('Login page - user role type:', typeof user.role);
      
      // Chuyển đổi role thành chữ hoa để so sánh nhất quán
      const userRole = typeof user.role === 'string' ? user.role.toUpperCase() : '';
      console.log('Login page - normalized user role:', userRole);
      
      // Redirect based on normalized user role
      switch (userRole) {
        case 'DOCTOR':
          console.log('Login page - redirecting to doctor dashboard');
          router.push('/dashboard-doctor');
          break;
        case 'PHARMACIST':
          console.log('Login page - redirecting to pharmacy page');
          router.push('/pharmacyPage');
          break;
        case 'RECEPTIONIST':
          console.log('Login page - redirecting to receptionist page');
          router.push('/receptionistPage');
          break;
        case 'PATIENT':
          console.log('Login page - redirecting patient to home page');
          router.push('/');
          break;
        default:
          console.log('Login page - unknown role, redirecting to home');
          router.push('/');
          break;
      }
    }
  }, [isAuthenticated, router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      // Routing will be handled by the useEffect above
    } catch (err) {
      setError('Email hoặc mật khẩu không đúng');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <UserIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">MediClinic</h1>
          </div>
        </div>
        <h2 className="mt-6 text-center text-4xl font-black text-gray-900 tracking-tight">
          Đăng nhập
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Địa chỉ email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="Nhập email của bạn"
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Mật khẩu
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                  placeholder="Nhập mật khẩu của bạn"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer transition-colors"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </div>
            
            <div>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ChevronLeftIcon className="h-4 w-4 mr-1" />
                Quay lại trang chủ
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="relative flex flex-col items-center text-sm">
                <span className="px-2 bg-white text-gray-900 font-medium mb-2">
                  Thông tin đăng nhập demo:
                </span>
                <ul className="text-gray-700 text-center">
                  <li><strong>Bệnh nhân:</strong> an.nguyen@mediclinic.com</li>
                  <li><strong>Bác sĩ:</strong> hoa.tran@mediclinic.com</li>
                  <li><strong>Lễ tân:</strong> tuan.ta@mediclinic.com </li>
                  <li><strong>Nhà thuốc:</strong> anh.hai@mediclinic.com</li>
                  <li><strong>Pass:</strong> password123</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}