import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JsonResponse, UserResponse } from 'global-interfaces/src/response';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface LoginResult {
	token: string;
	user: UserResponse;
}

export const loginUser = async (
	email: string,
	password: string,
): Promise<JsonResponse<LoginResult>> => {
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) {
		throw new Error('No existe el usuario');
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		throw new Error('Credenciales incorrectas');
	}

	const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '8h' });

	const userResponse: UserResponse = {
		id: user.id,
		email: user.email,
		name: user.name,
		createdAt: user.createdAt,
	};

	return {
		msg: 'Login successful',
		success: true,
		result: { token, user: userResponse },
	};
};
