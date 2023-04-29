/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { VerifyCallback } from 'passport-oauth2';
import fetch from 'node-fetch';
import async from 'async';
import type { AsyncResultCallback } from 'async';
import GithubStrategy from 'passport-github2';
import { createUser } from '../services/userService';
import * as userService from '../services/userService';

export default new GithubStrategy.Strategy(
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
    // console.log('accessToken: ', accessToken);
    try {
      let existingUser, emailArray, user;
      if (!profile._json.email) {
        const emailResponse = await fetch(
          'https://api.github.com/user/emails',
          {
            headers: { authorization: `token ${accessToken}` },
          }
        );
        emailArray = await emailResponse.json();
        // console.log('content: ', content);

        // Using async package for making paralell asynchronous requests.
        const getExistingUserParallel = async (
          email: { email: string; [key: string]: any },
          callback: AsyncResultCallback<User>
        ): Promise<void> => {
          try {
            const foundUser = await userService.getExistingUser(email.email);
            return callback(null, foundUser);
          } catch (err: any) {
            return callback(err);
          }
        };

        const userArray = await async.map(emailArray, getExistingUserParallel);
        userArray.forEach((user) => {
          if (user) existingUser = user;
        });
        // console.log(emailArray, userArray);
      } else {
        existingUser = await userService.getExistingUser(profile._json.email);
      }

      if (existingUser) {
        user = { ...existingUser, ...{ password: '', token: '' } };
      } else {
        const email = profile._json.email || emailArray[0].email;
        const nameArray = profile._json.name
          ? profile._json.name.split(' ')
          : [email, ''];
        const createdUser = await createUser(
          nameArray[0],
          nameArray[1],
          email,
          ''
        );
        user = { ...createdUser, ...{ password: '', token: '' } };
      }
      return done(null, user);
    } catch (err) {
      return done(err as Error);
    }
  }
);
