import express from 'express';
import type { Request, Response, Router, NextFunction } from 'express';
import passport from 'passport';

const router: Router = express.Router();

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  (req: Request, res: Response) => {
    /*
   The request will be redirected to GitHub for authentication. After authorization, GitHub will redirect the user back to this application at /auth/github/callback, so this  function will not be called.
   */
  }
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: 'http://localhost:3000/login',
    failureMessage: true,
  }),
  (req: Request, res: Response) => {
    // res.status(200).json({ user_id: 1 });
    res.status(302).redirect('http://localhost:3000/dashboard');
  }
);

router.get('/getUserInfo', (req: Request, res: Response) => {
  // console.log('user: ', req.user);
  res.status(200).json(req.user);
});

router.delete('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json('Logout successfully');
  });
});

export default router;
