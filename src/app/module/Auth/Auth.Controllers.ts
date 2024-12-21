import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { authServises } from './Auth.Servises';
import httpStatus from 'http-status';

const loginUser = catchAsynch(async (req, res) => {
  const result = await authServises.createAuth(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'User login succesfuly',
    data: result,
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

export const authController = {
  loginUser,
  chengePassword,
};
