import { Request, Response } from 'express';
import { userServises } from './user.servises';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';
import catchAsynch from '../utility/catcingAsynch';
import AppError from '../../error/apperror';

const creatUser = catchAsynch(async (req: Request, res: Response) => {
  console.log(req.file);
  console.log(req.body);
  const { password, student } = req.body;
  const result = await userServises.createUserServerDB(
    password,
    student,
    req.file,
  );
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

const userThisDataFind = catchAsynch(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Not Authorize');
  }
  const result = await userServises.findThisUserData(user);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'User retrieved  successfully',
    data: result,
  });
});
const changeUserStatus = catchAsynch(async (req: Request, res: Response) => {
  const token = req.user;
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Not Authorize');
  }
  const { id } = req.params;
  const result = await userServises.ChangeUserStautsIntoDb(id, req.body, token);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Successfully Change User Status',
    data: result,
  });
});

export const userContoller = {
  creatUser,
  createFaculty,
  createAdmin,
  userThisDataFind,
  changeUserStatus,
};
