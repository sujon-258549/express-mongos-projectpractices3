import AppError from '../../error/apperror';
import { UserModel } from '../user/user.model';
import { TloginUser } from './Auth.interfaces';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

const createAuth = async (paylod: TloginUser) => {
  const isExisUserId = await UserModel.findOne({ id: paylod.id });
  if (!isExisUserId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Your User Id is Invalid!');
  }
  const isDeleteUser = isExisUserId?.isDeleted;
  if (isDeleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your User is Delete!');
  }
  const isStatusCheck = isExisUserId?.status;
  if (isStatusCheck === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'Your User is Blocked!');
  }

  const password = paylod?.password;
  const hasPassword = isExisUserId?.password;

  const isPasswordMatch = await bcrypt.compare(password, hasPassword);

  console.log(isPasswordMatch);
};

export const authServises = {
  createAuth,
};
