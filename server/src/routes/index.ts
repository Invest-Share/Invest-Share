import express from 'express';
import type { Request, Response, Router } from 'express';
import * as userController from '../controllers/userController';
import * as holdingsController from '../controllers/holdingsController';
import * as updateStocksController from '../controllers/updateStocksController';
import * as relationshipsController from '../controllers/relationshipsController';
import * as validator from '../middleware/validator';

const router: Router = express.Router();

router.post('/signup', userController.signup, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.createdUser);
});

router.post('/login', userController.login, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.existingUser);
});

// My portfolio
// get users stocks/qty (DB)
router.get(
  '/getHoldings/:id',
  holdingsController.getHoldings,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.holdings);
  }
);

// get friend's stocks/qty (DB)
router.get(
  '/getFriendHoldings/:id',
  holdingsController.getFriendHoldings,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.holdings);
  }
);

// post updated qtys (DB)
router.post(
  '/addHolding',
  validator.addHolding,
  holdingsController.addHolding,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.holdings);
  }
);

// patch updated qtys (DB)
router.patch(
  '/updateHolding',
  validator.addHolding,
  holdingsController.updateHolding,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.holdings);
  }
);

// delete updated qtys (DB)
router.delete(
  '/deleteHolding',
  validator.deleteHolding,
  holdingsController.deleteHolding,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.holdings);
  }
);

// get current closing price for all ticker symbols (API)
// Not implement in frontend yet
router.get(
  '/closingPrice/:id',
  updateStocksController.getTickers,
  updateStocksController.getClosingPrice,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.holdings);
  }
);

// Add Friend
// post new friend (DB)
router.post(
  '/addRelationship',
  validator.relationships,
  relationshipsController.addRelationship,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.relationships);
  }
);

// View friends
// get friends (DB)
router.get(
  '/relationships/:id',
  relationshipsController.getRelationships,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.relationships);
  }
);

// Share post

// Newsfeed

// Log Out

// OAuth

export default router;
