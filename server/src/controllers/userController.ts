import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Response, Request, NextFunction } from 'express';

import * as userService from '../services/userService';
import { JWT_SECRET } from '../utils/config';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    } = req.body.userData;

    if (await userService.userExists(email)) {
      throw new Error('email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await userService.createUser(
      firstName,
      lastName,
      email,
      hashedPassword
    );

    if (JWT_SECRET === undefined) {
      throw Error('JWT_SECRET is not detected by server.');
    }

    const token = jwt.sign({ id: createdUser.id }, JWT_SECRET);
    res.locals.createdUser = { ...createdUser, ...{ token } };

    return next();
  } catch (err) {
    return next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body.userData;
    const existingUser = await userService.getExistingUser(email);

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    existingUser.password = '';

    let token: string;

    if (JWT_SECRET === undefined) {
      throw Error('JWT_SECRET is not detected by server.');
    }

    // JWT token is currently not saved in cookies. Token with other user info are responded back to FE and saved in local storage for future use (prone to user's manipulation).
    if (isValidPassword) {
      token = jwt.sign({ id: existingUser.id }, JWT_SECRET);
      res.locals.existingUser = { ...existingUser, ...{ token } };
    } else throw new Error('Incorrect credentials');

    return next();
  } catch (err) {
    return next(err);
  }
};
