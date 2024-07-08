import { Router } from 'express';
import {
	createRoleController,
	getRoleController,
} from '../controllers/roleController';
import { authenticateToken } from '../middleware';

const router = Router();

router.post('/', authenticateToken, createRoleController);
router.get('/:id', authenticateToken, getRoleController);

export default router;
