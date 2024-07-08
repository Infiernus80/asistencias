import { Request, Response } from 'express';
import { UserResponse, JsonResponse } from 'global-interfaces';
import { loginUser } from '../services/authServices';

interface LoginResult {
	token: string;
	user: UserResponse;
}

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const response: JsonResponse<LoginResult> = await loginUser(
			email,
			password,
		);
		res.status(200).json(response);
	} catch (error) {
		const response: JsonResponse<null> = {
			msg: 'Login failed',
			success: false,
			errors: [error.message],
		};
		res.status(400).json(response);
	}
};
