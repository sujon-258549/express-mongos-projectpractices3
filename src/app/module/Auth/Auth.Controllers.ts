import config from '../../config';
import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { authServises } from './Auth.Servises';
import httpStatus from 'http-status';

const loginUser = catchAsynch(async (req, res) => {
  const result = await authServises.createAuth(req.body);
  const { refreshToken, accessToken, needPasswordChenge } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
  });

  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'User login succesfuly',
    data: {
      accessToken,
      needPasswordChenge,
    },
  });
});

const chengePassword = catchAsynch(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await authServises.chengePassword(req.user, passwordData);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Chenge password is success',
    data: result,
  });
});
const refreshToken = catchAsynch(async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log('refreshToken', refreshToken);
  const result =
    await authServises.refreshTokenUseCreateAccessToken(refreshToken);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Chenge password is success',
    data: result,
  });
});

const forgetPassword = catchAsynch(async (req, res) => {
  const userId = req.body.id;
  const result = await authServises.forgetPassword(userId);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

const resetPassword = catchAsynch(async (req, res) => {
  const token = req?.headers?.authorization;
  const result = await authServises.resetPassword(req.body, token);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Password reset succesful!',
    data: result,
  });
});

export const authController = {
  loginUser,
  chengePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
