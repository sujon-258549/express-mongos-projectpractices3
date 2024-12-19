import { NextFunction, Request, Response } from 'express';
import catchAsynch from './catcingAsynch';
import AppError from '../../error/apperror';
import httpStatus from 'http-status';

const auth = () => {
  return catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is not UnAuthorize');
      }
      console.log(req.headers.authorization);
      next();
    },
  );
};
export default auth;
