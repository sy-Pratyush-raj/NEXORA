import api from './api';
import { ActivityItem } from '../types';

export const activityService = {
  async getActivities(type?: string, limit?: number): Promise<ActivityItem[]> {
    const response = await api.get<{ success: boolean; data: ActivityItem[] }>('/activity', {
      params: { type, limit },
    });
    return response.data.data;
  },
};
