import React, { useState } from 'react';
import { UserIcon, KeyIcon } from 'lucide-react';
interface LoginPageProps {
  onLogin: () => void;
}
export function LoginPage({
  onLogin
}: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!username || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
    // For demo purposes, accept any login
    onLogin();
  };
  return <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800">PHÒNG KHÁM Y TẾ</h1>
          <p className="text-gray-600 mt-2">Hệ thống quản lý lễ tân</p>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Tên đăng nhập
            </label>
            <div className="flex items-center border rounded-md">
              <span className="px-3 py-2 bg-gray-100 border-r">
                <UserIcon size={20} className="text-gray-500" />
              </span>
              <input id="username" type="text" className="w-full px-4 py-2 focus:outline-none" placeholder="Nhập tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <div className="flex items-center border rounded-md">
              <span className="px-3 py-2 bg-gray-100 border-r">
                <KeyIcon size={20} className="text-gray-500" />
              </span>
              <input id="password" type="password" className="w-full px-4 py-2 focus:outline-none" placeholder="Nhập mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input id="remember" type="checkbox" className="h-4 w-4 text-blue-600" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>;
}