import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import insightRoutes from './routes/insightRoutes';
import activityRoutes from './routes/activityRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

export const createApp = (): Express => {
  const app = express();

  // Security Middleware
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CLIENT_URL || '*',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body parsing & logging
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Health Check Endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'operational',
      service: 'Nexora Core API Engine',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // API Route Mounts
  app.use('/api/auth', authRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/tasks', taskRoutes);
  app.use('/api/insights', insightRoutes);
  app.use('/api/activity', activityRoutes);
  app.use('/api/user', userRoutes);

  // 404 Route Catcher
  app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `API endpoint ${req.originalUrl} not found.`,
    });
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
