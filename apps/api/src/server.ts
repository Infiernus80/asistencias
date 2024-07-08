import 'dotenv/config';
import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

// Verificar conexión a la base de datos
async function main() {
	try {
		await prisma.$connect();
		console.log('Conectado a la base de datos');

		app.listen(PORT, () => {
			console.log(`Servidor corriendo en el puerto ${PORT}`);
		});
	} catch (e) {
		console.error('Error al conectar a la base de datos', e);
		process.exit(1);
	}
}

main();
