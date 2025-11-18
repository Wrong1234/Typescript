// ==================== src/routes/auth.routes.ts ====================
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post('/register', validate, authController.register);

router.post('/login', validate, authController.login);

router.get('/profile', authenticate, authController.getProfile);

export default router;