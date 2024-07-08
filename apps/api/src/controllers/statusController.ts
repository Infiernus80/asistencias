import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getExample = async (req: Request, res: Response) => {
	try {
		const result = await prisma.user.findMany(); // Asumiendo que tienes una tabla 'user'
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener datos' });
	}
};

export default {
	getExample,
};
