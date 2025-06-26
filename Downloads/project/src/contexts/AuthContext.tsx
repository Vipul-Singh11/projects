import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUser, mockAdmin } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'user' | 'admin') => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('airline_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'admin'): Promise<boolean> => {
    // Mock authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (role === 'admin' && email === 'admin@skywings.com' && password === 'admin123') {
      setUser(mockAdmin);
      localStorage.setItem('airline_user', JSON.stringify(mockAdmin));
      return true;
    } else if (role === 'user' && email === 'user@example.com' && password === 'user123') {
      setUser(mockUser);
      localStorage.setItem('airline_user', JSON.stringify(mockUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('airline_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};