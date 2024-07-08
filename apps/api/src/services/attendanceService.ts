import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAttendance = async (
	userId: number,
	checkIn: Date,
	checkOut: Date,
) => {
	return prisma.attendance.create({
		data: {
			userId,
			checkIn,
			checkOut,
			createdAt: new Date(),
		},
	});
};

export const getAttendanceById = async (id: number) => {
	return prisma.attendance.findUnique({
		where: { id },
	});
};
