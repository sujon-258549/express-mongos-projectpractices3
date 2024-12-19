import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsynch from './catcingAsynch';

const zodValidaction = (schema: AnyZodObject) => {
  return catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    },
  );
};

export default zodValidaction;
