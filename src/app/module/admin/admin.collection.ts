import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { adminServises } from './admin.servises';
import sendSuccess from '../utility/send-success';
import catchAsynch from '../utility/catcingAsynch';

const findAllAdmin = catchAsynch(async (req: Request, res: Response) => {
  const result = await adminServises.getAllAdminsFromDB(req.query);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'admin recived Success',
    meta: result.meta,
    data: result,
  });
});
const deleteAllAdmin = catchAsynch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminServises.deletedAdmin(id);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'admin delete Success',
    data: result,
  });
});

export const adminController = {
  findAllAdmin,
  deleteAllAdmin,
};
