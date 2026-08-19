import { Router } from 'express';
import { z } from 'zod';
import { register, login, demoLogin, getMe, logout } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validateMiddleware';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  workspaceName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/demo-login', demoLogin);
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;
