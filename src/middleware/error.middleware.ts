// ==================== src/middleware/error.middleware.ts ====================
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return sendError(res, 400, err.message);
  }

  if (err.code === 11000) {
    return sendError(res, 400, 'Email already exists');
  }

  sendError(res, 500, 'Internal server error');
};