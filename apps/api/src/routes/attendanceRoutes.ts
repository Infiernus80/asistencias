import { Router } from 'express';
import {
	createAttendanceController,
	getAttendanceController,
} from '../controllers/attendanceController';
import { authenticateToken } from '../middleware';

const router = Router();

router.post('/', authenticateToken, createAttendanceController);
router.get('/:id', authenticateToken, getAttendanceController);

export default router;
