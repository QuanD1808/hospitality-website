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
      const data = await apiLogin(email, password);
      // data sẽ chứa user info và token từ BE
      setUser(data);
      setIsAuthenticated(true);
      Cookies.set('user', JSON.stringify(data), { expires: 1 }); // Lưu user và token
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