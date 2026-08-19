import api from './api';
import { Task } from '../types';
import { localDB } from './localStore';

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
    try {
      const response = await api.get<{ success: boolean; data: Task[] }>('/tasks', {
        params: filters,
      });
      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
    } catch {
      // fallback
    }

    let tasks = localDB.getTasks();
    if (!Array.isArray(tasks)) tasks = [];

    if (filters?.projectId && filters.projectId !== 'all') {
      tasks = tasks.filter((t) =>
        typeof t.projectId === 'object' && t.projectId !== null
          ? (t.projectId as any)._id === filters.projectId
          : t.projectId === filters.projectId
      );
    }
    if (filters?.status && filters.status !== 'all') {
      tasks = tasks.filter((t) => t.status === filters.status);
    }
    if (filters?.priority && filters.priority !== 'all') {
      tasks = tasks.filter((t) => t.priority === filters.priority);
    }
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      tasks = tasks.filter(
        (t) =>
          t.title?.toLowerCase().includes(query) ||
          (t.description && t.description.toLowerCase().includes(query))
      );
    }
    return tasks;
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    try {
      const response = await api.post<{ success: boolean; data: Task }>('/tasks', data);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return localDB.saveTask(data);
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    try {
      const response = await api.put<{ success: boolean; data: Task }>(`/tasks/${id}`, data);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return localDB.updateTask(id, data);
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch {
      // fallback
    }
    localDB.deleteTask(id);
  },
};
