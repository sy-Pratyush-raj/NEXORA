import api from './api';
import { Project } from '../types';

export interface ProjectFilters {
  status?: string;
  priority?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export const projectService = {
  async getProjects(filters?: ProjectFilters): Promise<Project[]> {
    const response = await api.get<{ success: boolean; data: Project[] }>('/projects', {
      params: filters,
    });
    return response.data.data;
  },

  async getProjectById(id: string): Promise<Project & { tasks: any[] }> {
    const response = await api.get<{ success: boolean; data: Project & { tasks: any[] } }>(`/projects/${id}`);
    return response.data.data;
  },

  async createProject(data: Partial<Project>): Promise<Project> {
    const response = await api.post<{ success: boolean; data: Project }>('/projects', data);
    return response.data.data;
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const response = await api.put<{ success: boolean; data: Project }>(`/projects/${id}`, data);
    return response.data.data;
  },

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },
};
