import * as updateStocksService from '../services/updateStocksService';
import * as holdingsService from '../services/holdingsService';
import type { Response, Request, NextFunction } from 'express';

export const getTickers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.locals.tickers = await updateStocksService.getTickers();
    return next();
  } catch (err) {
    return next(err);
  }
};

export const getClosingPrice = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // if (!res.locals.newStock) return
  try {
    // res.locals.updateClosingPriceSuccess = true;
    for (let i = 0; i < res.locals.tickers.length; i++) {
      const closingPrice = await updateStocksService.getClosingPriceAxios(
        res.locals.tickers[i]
      );
      await updateStocksService.updateClosingPrices(
        res.locals.tickers[i],
        closingPrice
      );
      // const result = await updateStocksService.updateClosingPrices(
      //   res.locals.tickers[i],
      //   closingPrice
      // );
      // if (!result) res.locals.updateClosingPriceSuccess = false;
    }
    const userId = req.params.id;
    res.locals.holdings = await holdingsService.getHoldings(userId);
    return next();
  } catch (err) {
    return next(err);
  }
};

// updateStocksController.getCompanyName = async (req, res, next) => {
//     try {
//         await updateStocksService.getCompanyName(res.locals.tickers);
//         return next();
//     } catch(err) {
//         return next(err)
//     }
// }
