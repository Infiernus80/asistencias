import { Router } from 'express';
import {
	createUserController,
	getUserController,
} from '../controllers/userController';
import { authenticateToken } from '../middleware';

const router = Router();

router.post('/', authenticateToken, createUserController);
router.get('/:id', authenticateToken, getUserController);

export default router;
