'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getRolePermissions, mockUser } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  permissions: ReturnType<typeof getRolePermissions>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const permissions = user ? getRolePermissions(user.role) : {
    canViewDashboard: false,
    canViewAnalytics: false,
    canExport: false,
    canManageUsers: false,
    canManageIntegrations: false,
    canSchedulePosts: false,
    canEditReports: false,
    canManageBilling: false,
  };

  return (
    <AuthContext.Provider value={{ user, permissions, login, logout, isLoading }}>
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