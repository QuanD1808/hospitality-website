import React from 'react';
import { BellIcon, UserIcon, LogOutIcon } from 'lucide-react';
interface HeaderProps {
  onLogout: () => void;
}
export function Header({
  onLogout
}: HeaderProps) {
  return <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Lễ tân phòng khám
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center">
          <div className="mr-2 p-2 bg-blue-100 rounded-full">
            <UserIcon size={20} className="text-blue-600" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-700">Nguyễn Văn A</p>
            <p className="text-xs text-gray-500">Lễ tân</p>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center text-gray-700 hover:text-red-600">
          <LogOutIcon size={20} className="mr-1" />
          <span className="hidden md:inline">Đăng xuất</span>
        </button>
      </div>
    </header>;
}