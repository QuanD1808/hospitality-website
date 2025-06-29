'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../datats/auth';
import Cookies from 'js-cookie';
import { login as apiLogin } from '../services/api.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = Cookies.get('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        Cookies.remove('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext - Login attempt:', email);
      const data = await apiLogin(email, password);
      console.log('AuthContext - Login response data:', data);
      
      // Tách token và thông tin người dùng
      const { token, ...userData } = data;
      
      // Xử lý role để đảm bảo nhất quán
      if (userData.role) {
        console.log('AuthContext - Original role:', userData.role);
        
        // Đảm bảo role là chuỗi và được lưu dưới dạng chữ hoa để nhất quán
        const normalizedRole = typeof userData.role === 'string' 
          ? userData.role.toUpperCase() 
          : userData.role;
        
        userData.role = normalizedRole;
        console.log('AuthContext - Normalized role:', userData.role);
      }
      
      setUser(userData);
      setIsAuthenticated(true);

      console.log('AuthContext - Setting user cookie with data:', userData);
      // Lưu thông tin người dùng và token vào cookie riêng biệt
      Cookies.set('user', JSON.stringify(userData), { expires: 1 });
      if (token) {
        Cookies.set('token', token, { expires: 1 });
      }
    } catch (error) {
      console.error('AuthContext - Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Xóa cả hai cookie khi đăng xuất
    Cookies.remove('user');
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}