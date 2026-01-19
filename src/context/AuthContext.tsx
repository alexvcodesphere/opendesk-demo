'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken, getTeamId, isAuthenticated as checkAuth } from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  teamId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [teamId, setTeamId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load from env vars
    setToken(getToken());
    setTeamId(getTeamId());
    setIsAuthenticated(checkAuth());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, teamId }}>
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
