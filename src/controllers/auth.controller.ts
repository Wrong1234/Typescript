
// ==================== src/controllers/auth.controller.ts ====================
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { sendSuccess, sendError } from '../utils/response';

const authService = new AuthService();

export class AuthController {

  async register(req: Request, res: Response, next: NextFunction) {

    try {
      const { email, password, name } = req.body;
      const { user, token } = await authService.register(email, password, name);

      sendSuccess(res, 201, { user, token }, 'Registration successful');
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await authService.login(email, password);

      sendSuccess(res, 200, { user, token }, 'Login successful');
    } catch (error: any) {
      if (error.message === 'Invalid email or password') {
        return sendError(res, 401, error.message);
      }
      next(error);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.getProfile(req.user!._id.toString());
      sendSuccess(res, 200, { user });
    } catch (error) {
      next(error);
    }
  }
}