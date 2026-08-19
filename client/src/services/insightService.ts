import api from './api';
import { AIInsight, MomentumPoint } from '../types';

export interface InsightPayload {
  summary: {
    totalProjects: number;
    healthyProjects: number;
    atRiskProjects: number;
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    blockedCount: number;
    completionRate: number;
  };
  insights: AIInsight[];
  blockedTasks: {
    id: string;
    title: string;
    projectId: string;
    reason: string;
    blockedDays: number;
    assignee: string;
    priority: string;
  }[];
}

export interface AskNexoraResult {
  query: string;
  answer: string;
  detail: string;
  steps: string[];
  recommendedAction: {
    label: string;
    route: string;
  };
}

export const insightService = {
  async getInsights(): Promise<InsightPayload> {
    const response = await api.get<{ success: boolean; data: InsightPayload }>('/insights');
    return response.data.data;
  },

  async getMomentum(): Promise<MomentumPoint[]> {
    const response = await api.get<{ success: boolean; data: MomentumPoint[] }>('/insights/momentum');
    return response.data.data;
  },

  async askNexora(query: string): Promise<AskNexoraResult> {
    const response = await api.post<{ success: boolean; data: AskNexoraResult }>('/insights/ask', { query });
    return response.data.data;
  },
};
