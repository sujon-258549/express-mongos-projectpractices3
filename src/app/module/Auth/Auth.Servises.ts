import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/apperror';
import { UserMainModel } from '../user/user.model';
import { TloginUser } from './Auth.interfaces';
import httpStatus from 'http-status';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './Auth.utils';
import sendEmail from '../../utils/sendEmail';

const createAuth = async (paylod: TloginUser) => {
  const user = await UserMainModel.isUserExistsByCustomId(paylod.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID.');
  }
  const isDeleteUser = await UserMainModel.isDeleteUser(
    paylod.id,
    user.isDeleted,
  );
  if (!isDeleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account has been deleted.');
  }
  //   get status true
  const isStatusCheck = await UserMainModel.isStatus(paylod.id);
  if (isStatusCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked.');
  }

  const password = paylod?.password;
  const hasPassword = user?.password;
  console.log(hasPassword, password);

  if (!(await UserMainModel.isPasswordMatch(password, hasPassword))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password.');
  }
  const JwtPayload = {
    userId: user.id,
    userRole: user.role,
  };

  const accessToken = createToken(
    JwtPayload,
    config.ACCESS_TOKEN as string,
    config.JWT_EXPIRE_IN_ACCESSTOKEN as string,
  );

  const refreshToken = createToken(
    JwtPayload,
    config.JWT_REFRES_TOCEN as string,
    config.JWT_EXPIRE_IN_REFRESS as string,
  );

  console.log({ accessToken, refreshToken });

  return {
    refreshToken,
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
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID.');
  }
  const isDeleteUser = await UserMainModel.isDeleteUser(
    userData.JwtPayload.userId,
    user.isDeleted,
  );
  if (!isDeleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account has been deleted.');
  }
  //   get status true
  const isStatusCheck = await UserMainModel.isStatus(
    userData.JwtPayload.userId,
  );
  if (isStatusCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked.');
  }

  const password = paylod?.oldPassword;
  const hasPassword = user?.password;

  console.log(password, hasPassword);

  if (!(await UserMainModel.isPasswordMatch(password, hasPassword))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password.');
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

const refreshTokenuseCreateAccessToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.JWT_REFRES_TOCEN as string,
  ) as JwtPayload;
  console.log(decoded);
  const { userId } = decoded.JwtPayload;
  const { iat } = decoded;
  const user = await UserMainModel.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID.');
  }

  const isDeleteUser = await UserMainModel.isDeleteUser(userId, user.isDeleted);
  if (!isDeleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account has been deleted.');
  }
  //   get status true
  const isStatusCheck = await UserMainModel.isStatus(userId);
  if (isStatusCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked.');
  }

  //   haktoken password change
  const passwordChangeAt = user?.passwordChangeAt;
  const changeTime = new Date(passwordChangeAt as Date).getTime() / 1000;
  if (changeTime > (iat as number)) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Token is no longer valid due to password change.',
    );
  }

  const JwtPayload = {
    userId: user.id,
    userRole: user.role,
  };

  const accessToken = createToken(
    JwtPayload,
    config.ACCESS_TOKEN as string,
    config.JWT_EXPIRE_IN_ACCESSTOKEN as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await UserMainModel.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID.');
  }

  const isDeleteUser = await UserMainModel.isDeleteUser(userId, user.isDeleted);
  if (!isDeleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account has been deleted.');
  }
  //   get status true
  const isStatusCheck = await UserMainModel.isStatus(userId);
  if (isStatusCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked.');
  }

  const JwtPayload = {
    userId: user.id,
    userRole: user.role,
  };

  const resetToken = createToken(
    JwtPayload,
    config.ACCESS_TOKEN as string,
    '10m',
  );

  const resetUiLink = `${config.RESET_UI_LINK}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email, resetUiLink);
  console.log(resetUiLink);
};

const resetPassword = async (
  paylod: { id: string; newPassword: string },
  token: string,
) => {
  console.log(token);
  const finduserId = paylod?.id;
  const user = await UserMainModel.isUserExistsByCustomId(finduserId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid user ID.');
  }

  const isDeleteUser = await UserMainModel.isDeleteUser(
    finduserId,
    user.isDeleted,
  );
  if (!isDeleteUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account has been deleted.');
  }
  //   get status true
  const isStatusCheck = await UserMainModel.isStatus(finduserId);
  if (isStatusCheck) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked.');
  }

  const decoded = jwt.verify(
    token,
    config.ACCESS_TOKEN as string,
  ) as JwtPayload;
  console.log(decoded);
  const { userId } = decoded.JwtPayload;
  if (paylod.id !== userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Forbeden');
  }

  const newHasPassword = await bcrypt.hash(
    paylod.newPassword,
    Number(config.bcript_has),
  );

  const result = await UserMainModel.findOneAndUpdate(
    {
      id: paylod.id,
    },
    {
      password: newHasPassword,
      needChangePassword: false,
      passwordChangeAt: new Date(),
    },
  );
  return result;
  //   const { iat } = decoded;
  //   const user = await UserMainModel.isUserExistsByCustomId(userId);
};

// http://localhost:5000?id=A-0002&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJKd3RQYXlsb2FkIjp7InVzZXJJZCI6IkEtMDAwMiIsInVzZXJSb2xlIjoiYWRtaW4ifSwiaWF0IjoxNzM1NDk1MTkyLCJleHAiOjE3MzU0OTU3OTJ9.j1M9df825Yc6JPkisHoX3YG0v_w0IxaNrUA3BdMNP20

export const authServises = {
  createAuth,
  chengePassword,
  forgetPassword,
  resetPassword,
  refreshTokenUseCreateAccessToken: refreshTokenuseCreateAccessToken,
};
