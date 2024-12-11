import { Request, Response } from 'express';
import { userServises } from './user.servises';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';
import catchAsynch from '../utility/catcingAsynch';

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
const createFaculty = catchAsynch(async (req: Request, res: Response) => {
  const { password, faculty } = req.body;
  const result = await userServises.createFacultyIntoDB(password, faculty);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});
const createAdmin = catchAsynch(async (req: Request, res: Response) => {
  const { password, admin } = req.body;
  const result = await userServises.createAdminIntoDB(password, admin);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const userContoller = {
  creatUser,
  createFaculty,
  createAdmin,
};
