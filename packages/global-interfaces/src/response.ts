import { User } from '@prisma/client';

export interface JsonResponse<T> {
	msg: string;
	success: boolean;
	errors?: string[];
	result?: T;
}

export type UserResponse = Omit<User, 'password'>;
