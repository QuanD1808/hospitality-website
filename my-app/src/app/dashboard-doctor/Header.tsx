import React from 'react';
import { UserCircleIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export const Header = () => {
  const {
    user,
    logout
  } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-blue-600">MediClinic</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center text-sm text-gray-800">
              <span className="font-bold text-gray-900">{user?.fullName || user?.username}</span>
              <span className="mx-2 text-gray-600">|</span>
              <span>{user?.specialization || user?.role}</span>
            </div>
            <div className="flex items-center">
              {/* <button className="p-1 rounded-full text-gray-600 hover:text-blue-600 focus:outline-none">
                <UserCircleIcon className="h-8 w-8" />
              </button> */}
              <button onClick={handleLogout} className="ml-2 p-1 rounded-full text-gray-600 hover:text-red-600 focus:outline-none flex items-center cursor-pointer">
                <LogOutIcon className="h-5 w-5" />
                <span className="ml-1 text-sm hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>;
};