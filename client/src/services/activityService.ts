import api from './api';
import { ActivityItem } from '../types';
import { localDB } from './localStore';

export const activityService = {
  async getActivities(type?: string, limit?: number): Promise<ActivityItem[]> {
    try {
      const response = await api.get<{ success: boolean; data: ActivityItem[] }>('/activity', {
        params: { type, limit },
      });
      return response.data.data;
    } catch {
      let activities = localDB.getActivities();
      if (type && type !== 'all') {
        activities = activities.filter((a) => a.type === type);
      }
      if (limit) {
        activities = activities.slice(0, limit);
      }
      return activities;
    }
  },
};
