/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from 'express';
import type { Request, Response, NextFunction, Express } from 'express';
import passport from 'passport';
import type { VerifyCallback } from 'passport-oauth2';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import indexRouter from '../routes/index';
import authRouter from '../routes/auth';
import GithubStrategy from 'passport-github2';
import { createUser } from '../services/userService';
import * as userService from '../services/userService';

const app: Express = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.urlencoded());

// Passport OAuth Configuration
passport.serializeUser(async function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done) {
  done(null, user);
});

passport.use(
  new GithubStrategy.Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4000/auth/github/callback',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) => {
      // console.log('profile:', profile);
      try {
        let user;
        const existingUser = await userService.getExistingUser(
          profile._json.email
        );
        if (existingUser) {
          user = { ...existingUser, ...{ password: '', token: '' } };
        } else {
          const nameArray = profile._json.name.split(' ');
          const createdUser = await createUser(
            nameArray[0],
            nameArray[1],
            profile._json.email,
            ''
          );
          user = { ...createdUser, ...{ password: '', token: '' } };
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

app.use(
  session({
    secret: process.env.JWT_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// import router objects containing middleware functions
app.use('/api', indexRouter);
app.use('/auth', authRouter);

// global error handling
/*
TO-DO: 1. Use the errorhandler package 2. confirm err type. 3. Re-write the err handler to provide more descriptive err message.
*/
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.sendStatus(400);
});

export default app;
