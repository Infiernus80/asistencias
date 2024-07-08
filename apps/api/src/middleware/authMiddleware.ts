import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'global-interfaces';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateToken = (
	req: Request & { user?: JwtPayload },
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user as JwtPayload;
		next();
	});
};
