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
      // Check for doctor account
      if (email === 'doctor@mediclinic.com' && password === 'password') {
        const doctorUser: User = {
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
          ...doctorUser,
          name: doctorUser.fullName,
          specialty: doctorUser.department
        };
        setUser(uiUser as any);
        setIsAuthenticated(true);
        Cookies.set('user', JSON.stringify(uiUser), { expires: 1 }); // Expires in 1 day
      } 
      // Check for pharmacy account
      else if (email === 'pharmacy@gmail.com' && password === 'password') {
        const pharmacyUser: User = {
          id: '2',
          username: 'pharmacy.user',
          password: 'password',
          fullName: 'Dược sĩ Trần Văn Bình',
          email: 'pharmacy@gmail.com',
          phone: '0987654321',
          role: UserRole.PHARMACIST,
          department: 'Nhà thuốc',
          licenseNumber: 'DS-67890',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        };
        // Map for UI
        const uiUser = {
          ...pharmacyUser,
          name: pharmacyUser.fullName,
          specialty: pharmacyUser.department
        };
        setUser(uiUser as any);
        setIsAuthenticated(true);
        Cookies.set('user', JSON.stringify(uiUser), { expires: 1 }); 
      }
      // Check for receptionist account
      else if (email === 'receptionist@gmail.com' && password === 'password') {
        const receptionistUser: User = {
          id: '3',
          username: 'receptionist.user',
          password: 'password',
          fullName: 'Lễ tân Lê Thị Hoa',
          email: 'receptionist@gmail.com',
          phone: '0912345678',
          role: UserRole.RECEPTIONIST,
          department: 'Lễ tân',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01')
        };
        // Map for UI
        const uiUser = {
          ...receptionistUser,
          name: receptionistUser.fullName,
          specialty: receptionistUser.department
        };
        setUser(uiUser as any);
        setIsAuthenticated(true);
        Cookies.set('user', JSON.stringify(uiUser), { expires: 1 }); 
      }
      else {
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