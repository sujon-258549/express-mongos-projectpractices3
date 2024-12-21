import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/apperror';
import { UserMainModel } from '../user/user.model';
import { TloginUser } from './Auth.interfaces';
import httpStatus from 'http-status';
import config from '../../config';
import bcrypt from 'bcrypt';

const createAuth = async (paylod: TloginUser) => {
  const user = await UserMainModel.isUserExistsByCustomId(paylod.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Your User Id is Invalid!');
  }
  const isDeleteUser = await UserMainModel.isDeleteUser(
    paylod.id,
    user.isDeleted,
  );
  if (!isDeleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your User is Delete!');
  }
  //   get status true
  const isStatusCheck = await UserMainModel.isStatus(paylod.id);
  if (isStatusCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your User is Blocked!');
  }

  const password = paylod?.password;
  const hasPassword = user?.password;
  console.log(hasPassword, password);

  if (!(await UserMainModel.isPasswordMatch(password, hasPassword))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your password is not match!');
  }
  const JwtPayload = {
    userId: user.id,
    userRole: user.role,
  };

  const accessToken = jwt.sign(
    {
      JwtPayload,
    },
    config.secret_kye as string,
    { expiresIn: '10d' },
  );
  console.log(accessToken);
  return {
    accessToken,
    needPasswordChenge: user.needChangePassword,
  };
};

const chengePassword = async (
  userData: JwtPayload,
  paylod: { oldPassword: string; newPassword: string },
) => {
  //   console.log(userData.JwtPayload.userId);
  const user = await UserMainModel.isUserExistsByCustomId(
    userData?.JwtPayload?.userId,
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Your User Id is Invalid!');
  }
  const isDeleteUser = await UserMainModel.isDeleteUser(
    userData.JwtPayload.userId,
    user.isDeleted,
  );
  if (!isDeleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your User is Delete!');
  }
  //   get status true
  const isStatusCheck = await UserMainModel.isStatus(
    userData.JwtPayload.userId,
  );
  if (isStatusCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your User is Blocked!');
  }

  const password = paylod?.oldPassword;
  const hasPassword = user?.password;

  console.log(password, hasPassword);

  if (!(await UserMainModel.isPasswordMatch(password, hasPassword))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your password is not match!');
  }

  const newHasPassword = await bcrypt.hash(
    paylod.newPassword,
    Number(config.bcript_has),
  );

  const result = await UserMainModel.findOneAndUpdate(
    {
      id: userData.JwtPayload.userId,
      role: userData.JwtPayload.userRole,
    },
    {
      password: newHasPassword,
      needChangePassword: false,
      passwordChangeAt: new Date(),
    },
  );

  return result;
};

export const authServises = {
  createAuth,
  chengePassword,
};
