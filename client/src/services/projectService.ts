import api from './api';
import { Project } from '../types';
import { localDB } from './localStore';

export interface ProjectFilters {
  status?: string;
  priority?: string;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export const projectService = {
  async getProjects(filters?: ProjectFilters): Promise<Project[]> {
    try {
      const response = await api.get<{ success: boolean; data: Project[] }>('/projects', {
        params: filters,
      });
      return response.data.data;
    } catch {
      let projects = localDB.getProjects();
      if (filters?.status && filters.status !== 'all') {
        projects = projects.filter((p) => p.status === filters.status);
      }
      if (filters?.priority && filters.priority !== 'all') {
        projects = projects.filter((p) => p.priority === filters.priority);
      }
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        projects = projects.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.key.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }
      return projects;
    }
  },

  async getProjectById(id: string): Promise<Project & { tasks: any[] }> {
    try {
      const response = await api.get<{ success: boolean; data: Project & { tasks: any[] } }>(`/projects/${id}`);
      return response.data.data;
    } catch {
      const projects = localDB.getProjects();
      const project = projects.find((p) => p._id === id) || projects[0];
      const tasks = localDB.getTasks().filter((t) => (typeof t.projectId === 'object' ? (t.projectId as any)?._id === id : t.projectId === id));
      return { ...project, tasks };
    }
  },

  async createProject(data: Partial<Project>): Promise<Project> {
    try {
      const response = await api.post<{ success: boolean; data: Project }>('/projects', data);
      return response.data.data;
    } catch {
      return localDB.saveProject(data);
    }
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    try {
      const response = await api.put<{ success: boolean; data: Project }>(`/projects/${id}`, data);
      return response.data.data;
    } catch {
      return localDB.updateProject(id, data);
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      await api.delete(`/projects/${id}`);
    } catch {
      localDB.deleteProject(id);
    }
  },
};
