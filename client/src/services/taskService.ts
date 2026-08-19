import api from './api';
import { Task } from '../types';

export interface TaskFilters {
  projectId?: string;
  status?: string;
  priority?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export const taskService = {
  async getTasks(filters?: TaskFilters): Promise<Task[]> {
    const response = await api.get<{ success: boolean; data: Task[] }>('/tasks', {
      params: filters,
    });
    return response.data.data;
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    const response = await api.post<{ success: boolean; data: Task }>('/tasks', data);
    return response.data.data;
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const response = await api.put<{ success: boolean; data: Task }>(`/tasks/${id}`, data);
    return response.data.data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
