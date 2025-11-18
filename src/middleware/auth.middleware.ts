// ==================== src/middleware/auth.middleware.ts ====================
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { User } from '../models/user.model';
import { sendError } from '../utils/response';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return sendError(res, 401, 'Authentication required');
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return sendError(res, 401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 401, 'Invalid or expired token');
  }
};