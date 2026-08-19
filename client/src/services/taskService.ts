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
      return response.data.data;
    } catch {
      let tasks = localDB.getTasks();
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
            t.title.toLowerCase().includes(query) ||
            (t.description && t.description.toLowerCase().includes(query))
        );
      }
      return tasks;
    }
  },

  async createTask(data: Partial<Task>): Promise<Task> {
    try {
      const response = await api.post<{ success: boolean; data: Task }>('/tasks', data);
      return response.data.data;
    } catch {
      return localDB.saveTask(data);
    }
  },

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    try {
      const response = await api.put<{ success: boolean; data: Task }>(`/tasks/${id}`, data);
      return response.data.data;
    } catch {
      return localDB.updateTask(id, data);
    }
  },

  async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch {
      localDB.deleteTask(id);
    }
  },
};
