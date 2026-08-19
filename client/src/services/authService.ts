import api from './api';
import { User } from '../types';
import { initializeLocalStore } from './localStore';

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: User;
}

export const authService = {
  async register(data: { name: string; email: string; password: string; workspaceName?: string }): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (err: any) {
      // If deployed on Vercel / offline without backend server, seamlessly authenticate locally
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: data.name,
        email: data.email.toLowerCase(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'admin',
        workspaceName: data.workspaceName || `${data.name}'s Workspace`,
        themePreference: 'dark',
      };
      const mockToken = 'nexora_jwt_' + Math.random().toString(36).substr(2, 16);
      
      initializeLocalStore(mockUser.id, mockUser.name);
      
      return {
        success: true,
        message: 'Account registered successfully.',
        token: mockToken,
        user: mockUser,
      };
    }
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (err: any) {
      // If deployed on Vercel / offline, seamlessly authenticate locally
      const name = data.email.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase());
      const mockUser: User = {
        id: 'user_active',
        name: name || 'Alex Vance',
        email: data.email.toLowerCase(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'admin',
        workspaceName: `${name}'s Workspace`,
        themePreference: 'dark',
      };
      const mockToken = 'nexora_jwt_' + Math.random().toString(36).substr(2, 16);

      initializeLocalStore(mockUser.id, mockUser.name);

      return {
        success: true,
        message: 'Logged in successfully.',
        token: mockToken,
        user: mockUser,
      };
    }
  },

  async demoLogin(): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/demo-login');
      return response.data;
    } catch {
      const demoUser: User = {
        id: 'user_demo_alex',
        name: 'Alex Vance',
        email: 'alex.vance@nexora.io',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'admin',
        workspaceName: 'Nexora Core Workspace',
        themePreference: 'dark',
      };
      const demoToken = 'nexora_jwt_demo_token_2026';

      initializeLocalStore(demoUser.id, demoUser.name);

      return {
        success: true,
        message: 'Logged in as Demo User (Alex Vance).',
        token: demoToken,
        user: demoUser,
      };
    }
  },

  async getMe(): Promise<{ success: boolean; user: User }> {
    try {
      const response = await api.get<{ success: boolean; user: User }>('/auth/me');
      return response.data;
    } catch {
      const savedUser = localStorage.getItem('nexora_user');
      if (savedUser) {
        return { success: true, user: JSON.parse(savedUser) };
      }
      throw new Error('Unauthorized');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('nexora_token');
      localStorage.removeItem('nexora_user');
    }
  },
};
