'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken, getTeamId, isAuthenticated as checkAuth } from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  teamId: string | null;
  isLoggedIn: boolean;
  userName: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple hardcoded credentials for demo
const DEMO_USERS: Record<string, string> = {
  'admin': 'admin123',
  'demo': 'demo',
  'test': 'test',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Load from env vars
    setToken(getToken());
    setTeamId(getTeamId());
    setIsAuthenticated(checkAuth());
    
    // Check if user was previously logged in
    const savedUser = localStorage.getItem('openapps_user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUserName(savedUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const trimmedUser = username.trim().toLowerCase();
    if (DEMO_USERS[trimmedUser] === password) {
      setIsLoggedIn(true);
      setUserName(trimmedUser);
      localStorage.setItem('openapps_user', trimmedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName(null);
    localStorage.removeItem('openapps_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, teamId, isLoggedIn, userName, login, logout }}>
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
