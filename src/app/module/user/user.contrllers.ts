import { Request, Response } from 'express';
import { userServises } from './user.servises';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';
import catchAsynch from '../utility/catcingAsynch';
import AppError from '../../error/apperror';

// create admin
const createAdmin = catchAsynch(async (req: Request, res: Response) => {
  const { password, admin } = req.body;
  const result = await userServises.createAdminIntoDB(
    password,
    admin,
    req.file,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});
// create faculty
const createFaculty = catchAsynch(async (req: Request, res: Response) => {
  const { password, faculty } = req.body;
  const result = await userServises.createFacultyIntoDB(
    password,
    faculty,
    req.file,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

// create student
const creatUser = catchAsynch(async (req: Request, res: Response) => {
  const { password, student } = req.body;
  const result = await userServises.createUserServerDB(
    password,
    student,
    req.file,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
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
    statuscode: httpStatus.OK,
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
    statuscode: httpStatus.OK,
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
