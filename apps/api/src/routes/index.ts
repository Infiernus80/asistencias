import { Router } from 'express';
import authRoutes from './authRoutes';
import statusRoutes from './statusRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/status', statusRoutes);

export default router;
