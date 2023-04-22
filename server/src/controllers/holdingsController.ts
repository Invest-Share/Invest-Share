import * as holdingsService from '../services/holdingsService';
import type { Response, Request, NextFunction } from 'express';

/*
TO-DO: Update the stock price info if more than 24 hrs since last update.
*/
export const getHoldings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = req.params.id;
    res.locals.holdings = await holdingsService.getHoldings(user_id);
    return next();
  } catch (err) {
    return next(err);
  }
};

export const addHolding = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      user_id,
      ticker,
      stock_quantity,
    }: { user_id: number; ticker: string; stock_quantity: number } = req.body;

    res.locals.addHoldingSuccess =
      (await holdingsService.addHoldingExisting(
        user_id,
        ticker,
        stock_quantity
      )) ||
      (await holdingsService.addHoldingNew(user_id, ticker, stock_quantity));

    res.locals.holdings = await holdingsService.getHoldings(user_id);
    return next();
  } catch (err) {
    return next(err);
  }
};

export const updateHolding = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      user_id,
      ticker,
      stock_quantity,
    }: { user_id: number; ticker: string; stock_quantity: number } = req.body;
    res.locals.updateHoldingSuccess = await holdingsService.updateHolding(
      user_id,
      ticker,
      stock_quantity
    );
    res.locals.holdings = await holdingsService.getHoldings(user_id);
    return next();
  } catch (err) {
    return next(err);
  }
};

export const deleteHolding = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { user_id, ticker }: { user_id: number; ticker: string } = req.body;
    res.locals.deleteHoldingSuccess = await holdingsService.deleteHolding(
      user_id,
      ticker
    );
    res.locals.holdings = await holdingsService.getHoldings(user_id);
    return next();
  } catch (err) {
    return next(err);
  }
};

export const getFriendHoldings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const friend_id = req.params.id;
    res.locals.holdings = await holdingsService.getHoldings(friend_id);
    res.locals.holdings = holdingsService.deleteSomeHoldingInfo(
      res.locals.holdings
    );
    return next();
  } catch (err) {
    return next(err);
  }
};
