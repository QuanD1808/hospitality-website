'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../data/auth';
import Cookies from 'js-cookie';

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
      // Mock login - replace with actual API call
      if (email === 'doctor@mediclinic.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          username: 'huong.nt',
          password: 'password',
          fullName: 'Dr. Nguyễn Thị Hương',
          email: 'doctor@mediclinic.com',
          phone: '0123456789',
          role: UserRole.DOCTOR,
          department: 'Nội tổng quát',
          specialization: 'Tim mạch',
          licenseNumber: 'BS-12345',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        };
        // Map for UI
        const uiUser = {
          ...mockUser,
          name: mockUser.fullName,
          specialty: mockUser.department
        };
        setUser(uiUser as any);
        setIsAuthenticated(true);
        Cookies.set('user', JSON.stringify(uiUser), { expires: 1 }); // Expires in 1 day
      } else {
        throw new Error('Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('user');
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