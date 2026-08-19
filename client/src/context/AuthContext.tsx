import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, workspaceName?: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexora_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('nexora_token') || null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('nexora_token');
      if (savedToken) {
        try {
          const res = await authService.getMe();
          setUser(res.user);
          localStorage.setItem('nexora_user', JSON.stringify(res.user));
        } catch {
          // Token expired or invalid
          setUser(null);
          setToken(null);
          localStorage.removeItem('nexora_token');
          localStorage.removeItem('nexora_user');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const handleAuthSuccess = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('nexora_token', newToken);
    localStorage.setItem('nexora_user', JSON.stringify(newUser));
  };

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    handleAuthSuccess(res.token, res.user);
  };

  const register = async (name: string, email: string, password: string, workspaceName?: string) => {
    const res = await authService.register({ name, email, password, workspaceName });
    handleAuthSuccess(res.token, res.user);
  };

  const demoLogin = async () => {
    const res = await authService.demoLogin();
    handleAuthSuccess(res.token, res.user);
  };

  const logout = async () => {
    await authService.logout();
    setToken(null);
    setUser(null);
  };

  const updateUser = (updated: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updated };
    setUser(updatedUser);
    localStorage.setItem('nexora_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        demoLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
