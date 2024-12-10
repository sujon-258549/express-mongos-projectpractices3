import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { adminServises } from './admin.servises';
import sendSuccess from '../utility/send-success';
import catchAsynch from '../utility/catcingAsynch';

const createAdmin = catchAsynch(async (req: Request, res: Response) => {
  const result = await adminServises.createAdmin(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'admin Created Success',
    data: result,
  });
});

export const adminController = {
  createAdmin,
};
