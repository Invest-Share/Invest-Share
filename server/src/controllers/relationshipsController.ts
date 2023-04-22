import * as relationshipsService from '../services/relationshipsService';
import type { Response, Request, NextFunction } from 'express';

export const addRelationship = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      user_id,
      first_name,
      last_name,
    }: { user_id: number; first_name: string; last_name: string } = req.body;
    await relationshipsService.addRelationship(user_id, first_name, last_name);
    res.locals.relationships = await relationshipsService.getRelationships(
      user_id
    );
    return next();
  } catch (err) {
    return next(err);
  }
};

export const getRelationships = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = req.params.id;
    res.locals.relationships = await relationshipsService.getRelationships(
      user_id
    );
    return next();
  } catch (err) {
    return next(err);
  }
};
