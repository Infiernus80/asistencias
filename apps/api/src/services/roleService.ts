import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRole = async (name: string) => {
	return prisma.role.create({
		data: {
			name,
		},
	});
};

export const getRoleById = async (id: number) => {
	return prisma.role.findUnique({
		where: { id },
	});
};
