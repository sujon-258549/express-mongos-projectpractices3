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

export const authController = {
  loginUser,
  chengePassword,
  refreshToken,
};
