import api from './api';
import { User } from '../types';

export interface AuthResponse {
  success: boolean;
  message?: string;
  token: string;
  user: User;
}

export const authService = {
  async register(data: { name: string; email: string; password: string; workspaceName?: string }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async demoLogin(): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/demo-login');
    return response.data;
  },

  async getMe(): Promise<{ success: boolean; user: User }> {
    const response = await api.get<{ success: boolean; user: User }>('/auth/me');
    return response.data;
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
