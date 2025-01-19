import config from '../../config';
import catchAsync from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { authServises as authServices } from './Auth.Servises';
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.createAuth(req.body);
  const { refreshToken, accessToken, needPasswordChenge } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV !== 'development',
    httpOnly: true,
  });

  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'User login succesfuly',
    data: {
      accessToken,
      needPasswordChenge,
    },
  });
});

const chengePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await authServices.chengePassword(req.user, passwordData);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Cheng password is success',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log('refreshToken', refreshToken);
  const result =
    await authServices.refreshTokenUseCreateAccessToken(refreshToken);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Refresh Token Create is success',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await authServices.forgetPassword(userId);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated succesfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;
  const result = await authServices.resetPassword(req.body, token);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
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
