import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  code?: number | string;
  errors?: Record<string, any>;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${req.method}] ${req.originalUrl} - Error: ${message}`, {
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    res.status(409).json({
      success: false,
      message: 'A resource with this identifier or email already exists.',
    });
    return;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError' && err.errors) {
    const errorMessages = Object.values(err.errors).map((e: any) => e.message);
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages,
    });
    return;
  }

  // Handle CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Invalid resource ID format',
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
