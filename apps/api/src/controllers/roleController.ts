import { Request, Response } from 'express';
import { createRole, getRoleById } from '../services/roleService';
import { JsonResponse } from 'global-interfaces';

export const createRoleController = async (req: Request, res: Response) => {
	const { name } = req.body;

	try {
		const role = await createRole(name);
		const response: JsonResponse<typeof role> = {
			msg: 'Role created successfully',
			success: true,
			result: role,
		};
		res.status(201).json(response);
	} catch (error) {
		const response: JsonResponse<null> = {
			msg: 'Role creation failed',
			success: false,
			errors: [error.message],
		};
		res.status(400).json(response);
	}
};

export const getRoleController = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const role = await getRoleById(Number(id));
		const response: JsonResponse<typeof role> = {
			msg: 'Role fetched successfully',
			success: true,
			result: role,
		};
		res.status(200).json(response);
	} catch (error) {
		const response: JsonResponse<null> = {
			msg: 'Role fetch failed',
			success: false,
			errors: [error.message],
		};
		res.status(400).json(response);
	}
};
