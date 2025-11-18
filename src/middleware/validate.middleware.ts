// ==================== src/middleware/validate.middleware.ts ====================
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendError } from '../utils/response';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 400, errors.array()[0].msg);
  }
  //check code
  next();
};