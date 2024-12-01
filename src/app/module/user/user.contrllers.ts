import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userServises } from './user.servises';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';

const catchAsynch = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

const creatUser = catchAsynch(async (req: Request, res: Response) => {
  const { password, student } = req.body;
  const result = await userServises.createUserServerDB(password, student);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const userContoller = {
  creatUser,
};
