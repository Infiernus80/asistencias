import { Request, Response } from 'express';
import {
	createAttendance,
	getAttendanceById,
} from '../services/attendanceService';
import { JsonResponse } from 'global-interfaces';

export const createAttendanceController = async (
	req: Request,
	res: Response,
) => {
	const { userId, checkIn, checkOut } = req.body;

	try {
		const attendance = await createAttendance(
			userId,
			new Date(checkIn),
			new Date(checkOut),
		);
		const response: JsonResponse<typeof attendance> = {
			msg: 'Attendance recorded successfully',
			success: true,
			result: attendance,
		};
		res.status(201).json(response);
	} catch (error) {
		const response: JsonResponse<null> = {
			msg: 'Attendance recording failed',
			success: false,
			errors: [error.message],
		};
		res.status(400).json(response);
	}
};

export const getAttendanceController = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const attendance = await getAttendanceById(Number(id));
		const response: JsonResponse<typeof attendance> = {
			msg: 'Attendance fetched successfully',
			success: true,
			result: attendance,
		};
		res.status(200).json(response);
	} catch (error) {
		const response: JsonResponse<null> = {
			msg: 'Attendance fetch failed',
			success: false,
			errors: [error.message],
		};
		res.status(400).json(response);
	}
};
