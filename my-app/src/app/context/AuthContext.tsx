'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../datats/auth';
import Cookies from 'js-cookie';
import { login as apiLogin, validateToken } from '../services/api.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;  // Added token property
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<boolean>; // Thêm hàm refresh token
  validateCurrentToken: () => Promise<boolean>; // Thêm hàm kiểm tra token hiện tại
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null); // Added token state

  useEffect(() => {
    // Check for existing session
    const storedUser = Cookies.get('user');
    const storedToken = Cookies.get('token'); // Get stored token
    
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
    
    // Set token from cookie if available
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('AuthContext - Login attempt:', email);
      const data = await apiLogin(email, password);
      console.log('AuthContext - Login response data:', data);
      
      // Tách token và thông tin người dùng
      const { token: authToken, ...userData } = data;
      
      // Đảm bảo role là chuỗi và được lưu dưới dạng chữ hoa để nhất quán
      if (userData.role) {
        console.log('AuthContext - Original role:', userData.role);
        const normalizedRole = typeof userData.role === 'string' 
          ? userData.role.toUpperCase() 
          : userData.role;
        
        userData.role = normalizedRole;
        console.log('AuthContext - Normalized role:', userData.role);
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      setToken(authToken); // Save token to state

      console.log('AuthContext - Setting user cookie with data:', userData);
      // Lưu thông tin người dùng và token vào cookie riêng biệt
      Cookies.set('user', JSON.stringify(userData), { expires: 1 });
      if (authToken) {
        Cookies.set('token', authToken, { expires: 1 });
      }
    } catch (error) {
      console.error('AuthContext - Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setToken(null); // Clear token
    // Xóa cả hai cookie khi đăng xuất
    Cookies.remove('user');
    Cookies.remove('token');
  };

  // Hàm để làm mới token khi token hiện tại không hợp lệ
  const refreshToken = async () => {
    console.log('AuthContext - Attempting to refresh token');
    // Trong triển khai thực tế, bạn sẽ gọi endpoint refresh-token của API
    // Hiện tại chúng ta chỉ kiểm tra nếu user object còn tồn tại
    
    if (user && user.email) {
      try {
        // Giả lập request refresh token bằng cách đăng nhập lại
        // Trong thực tế sẽ là gọi API refresh-token
        console.log('Would call refresh token API here with existing user:', user.email);
        return true;
      } catch (error) {
        console.error('AuthContext - Token refresh error:', error);
        // Đăng xuất người dùng nếu không thể làm mới token
        logout();
        return false;
      }
    } else {
      return false;
    }
  };

  const validateCurrentToken = async () => {
    const storedToken = Cookies.get('token');
    if (!storedToken) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const tokenStatus = await validateToken(storedToken);
      const isValid = tokenStatus.valid;
      setIsAuthenticated(isValid);
      return isValid;
    } catch (error) {
      console.error('AuthContext - Token validation error:', error);
      setIsAuthenticated(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, login, logout, refreshToken, validateCurrentToken }}>
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