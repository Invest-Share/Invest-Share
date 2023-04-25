import express from 'express';
import type { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import router from '../routes/index';

const app: Express = express();

// let cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// import controller objects containing middleware functions

app.use(express.json());

app.use('/api', router);

// global error handling
/*
TO-DO: 1. Use the errorhandler package 2. confirm err type. 3. Re-write the err handler to provide more descriptive err message.
*/
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.sendStatus(400);
});

export default app;
