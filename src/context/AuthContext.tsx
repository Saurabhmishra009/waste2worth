'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, VerificationApplication } from '@/types';
import { StorageService, initializeStorage, DEMO_USERS } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => boolean;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'verificationStatus'>) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  submitVerification: (data: Omit<VerificationApplication, 'id' | 'status' | 'submittedAt'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const current = StorageService.getCurrentUser();
    setUser(current || DEMO_USERS[0]);
    setLoading(false);
  }, []);

  const switchRole = (newRole: UserRole) => {
    const updatedUser = StorageService.switchDemoRole(newRole);
    setUser(updatedUser);
  };

  const login = (email: string, role?: UserRole): boolean => {
    const users = StorageService.getUsers();
    let found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found && role) {
      found = users.find((u) => u.role === role);
    }

    if (found) {
      StorageService.setCurrentUser(found);
      setUser(found);
      return true;
    }

    // If not found, log in with default demo matching role or seller
    const fallback = users.find((u) => u.role === (role || 'seller')) || users[0];
    StorageService.setCurrentUser(fallback);
    setUser(fallback);
    return true;
  };

  const register = (userData: Omit<User, 'id' | 'createdAt' | 'verificationStatus'>) => {
    const newUser = StorageService.createUser(userData);
    setUser(newUser);
  };

  const logout = () => {
    StorageService.setCurrentUser(null);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = StorageService.updateUser(user.id, updates);
    if (updated) {
      setUser(updated);
    }
  };

  const submitVerification = (data: Omit<VerificationApplication, 'id' | 'status' | 'submittedAt'>) => {
    StorageService.submitVerification(data);
    if (user) {
      setUser({
        ...user,
        verificationStatus: 'pending',
        gstNumber: data.gstin,
        businessAddress: data.businessAddress,
      });
    }
  };

  const role: UserRole = user?.role || 'buyer';
  const isAuthenticated = !!user;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAF7]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#14532D] border-t-transparent" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        switchRole,
        login,
        register,
        logout,
        updateUser,
        submitVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
