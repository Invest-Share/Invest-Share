import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';
import type { Response, Request, NextFunction } from 'express';

// Not implemented in any route yet
export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Authentication info missing');
    }

    const token = req.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, JWT_SECRET as string);

    /*
    TO-DO: each route should use this res.locals.userId instead of id in req.body
    */
    res.locals.userId = (payload as JwtPayload).id;

    return next();
  } catch (err) {
    return next(err);
  }
};
