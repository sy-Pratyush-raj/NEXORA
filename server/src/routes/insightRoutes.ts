import { Router } from 'express';
import { getInsights, getMomentum, askNexora } from '../controllers/insightController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getInsights);
router.get('/momentum', getMomentum);
router.post('/ask', askNexora);

export default router;
