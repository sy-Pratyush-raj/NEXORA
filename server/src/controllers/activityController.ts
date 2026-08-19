import { Response, NextFunction } from 'express';
import { Activity } from '../models/Activity';
import { AuthRequest } from '../types';

export const getActivities = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { type, limit = 50 } = req.query;

    const filter: any = { userId };
    if (type && type !== 'all') {
      filter.type = type;
    }

    const activities = await Activity.find(filter)
      .populate('projectId', 'name key')
      .populate('taskId', 'title status')
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};
