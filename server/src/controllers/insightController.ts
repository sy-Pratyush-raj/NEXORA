import { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { AuthRequest } from '../types';
import { generateWorkspaceInsights, getWorkspaceMomentumData, simulateAskNexora } from '../services/analyticsService';

export const getInsights = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user?.id);
    const insightsData = await generateWorkspaceInsights(userId);

    res.status(200).json({
      success: true,
      data: insightsData,
    });
  } catch (error) {
    next(error);
  }
};

export const getMomentum = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user?.id);
    const momentum = await getWorkspaceMomentumData(userId);

    res.status(200).json({
      success: true,
      data: momentum,
    });
  } catch (error) {
    next(error);
  }
};

export const askNexora = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = new Types.ObjectId(req.user?.id);
    const { query } = req.body;

    if (!query) {
      res.status(400).json({ success: false, message: 'Query string is required.' });
      return;
    }

    const response = await simulateAskNexora(query, userId);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
