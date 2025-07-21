import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, UsersIcon, ClockIcon, FileTextIcon, PillIcon, CalendarIcon } from 'lucide-react';
export function Sidebar() {
  const navItems = [{
    path: '/dashboard',
    label: 'Trang chủ',
    icon: <HomeIcon size={20} />
  }, {
    path: '/patients',
    label: 'Quản lý bệnh nhân',
    icon: <UsersIcon size={20} />
  }, {
    path: '/appointments',
    label: 'Đặt lịch online',
    icon: <CalendarIcon size={20} />
  }, {
    path: '/queue',
    label: 'Phòng chờ',
    icon: <ClockIcon size={20} />
  }, {
    path: '/examination-history',
    label: 'Lịch sử khám',
    icon: <FileTextIcon size={20} />
  }, {
    path: '/medication-history',
    label: 'Lịch sử thuốc',
    icon: <PillIcon size={20} />
  }];
  return <aside className="w-64 bg-blue-800 text-white">
      <div className="p-4 border-b border-blue-700">
        <h2 className="text-xl font-bold">PHÒNG KHÁM Y TẾ</h2>
        <p className="text-sm text-blue-300 mt-1">Hệ thống quản lý</p>
      </div>
      <nav className="mt-4">
        <ul>
          {navItems.map(item => <li key={item.path} className="mb-1">
              <NavLink to={item.path} className={({
            isActive
          }) => `flex items-center px-4 py-3 ${isActive ? 'bg-blue-900 text-white border-l-4 border-white' : 'text-blue-200 hover:bg-blue-700'}`}>
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>)}
        </ul>
      </nav>
    </aside>;
}