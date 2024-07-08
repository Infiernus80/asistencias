import { Request, Response } from 'express';
import { createUser, getUserById } from '../services/userService';
import { JsonResponse } from 'global-interfaces';

export const createUserController = async (req: Request, res: Response) => {
	const { email, password, name } = req.body;

	try {
		const user = await createUser(email, password, name);
		const response: JsonResponse<typeof user> = {
			msg: 'User created successfully',
			success: true,
			result: user,
		};
		res.status(201).json(response);
	} catch (error) {
		const response: JsonResponse<null> = {
			msg: 'User creation failed',
			success: false,
			errors: [error.message],
		};
		res.status(400).json(response);
	}
};

export const getUserController = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await getUserById(Number(id));
		const response: JsonResponse<typeof user> = {
			msg: 'User fetched successfully',
			success: true,
			result: user,
		};
		res.status(200).json(response);
	} catch (error) {
		const response: JsonResponse<null> = {
			msg: 'User fetch failed',
			success: false,
			errors: [error.message],
		};
		res.status(400).json(response);
	}
};
