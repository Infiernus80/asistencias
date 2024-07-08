import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	const passwordHash = await bcrypt.hash('root', 10);

	const user = await prisma.user.create({
		data: {
			email: 'usuario@example.com',
			password: passwordHash,
			name: 'Nombre del Usuario',
			createdAt: new Date(),
		},
	});

	console.log('Usuario creado:', user);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
