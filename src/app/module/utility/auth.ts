import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsynch from './catcingAsynch';
import AppError from '../../error/apperror';
import httpStatus from 'http-status';
import config from '../../config';
import { TuserRole } from '../user/user.interfaces';
import { UserMainModel } from '../user/user.model';

const auth = (...requiredRoles: TuserRole[]) => {
  return catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      // Check if token exists
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
      }
      //   console.log(requiredRoles);

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(
          token,
          config.ACCESS_TOKEN as string,
        ) as JwtPayload;
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      } catch (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
      }
      const { userId, userRole } = decoded.JwtPayload;
      const { iat } = decoded;
      if (!decoded) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
      }

      const user = await UserMainModel.isUserExistsByCustomId(userId);

      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'Your User Id is Invalid!');
      }
      const isDeleteUser = await UserMainModel.isDeleteUser(
        userId,
        user.isDeleted,
      );
      if (!isDeleteUser) {
        throw new AppError(httpStatus.FORBIDDEN, 'Your User is Delete!');
      }
      //   get status true
      const isStatusCheck = await UserMainModel.isStatus(userId);
      if (isStatusCheck) {
        throw new AppError(httpStatus.FORBIDDEN, 'Your User is Blocked!');
      }
      //   console.log(decoded);

      // Check for required roles
      if (requiredRoles && !requiredRoles?.includes(userRole)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'User does not have the required permissions',
        );
      }
      // hak token change password time compre

      const passwordChangeAt = user?.passwordChangeAt;
      const changeTime = new Date(passwordChangeAt as Date).getTime() / 1000;
      //   console.log(changeTime > (iat as number));
      if (changeTime > (iat as number)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is Un Authorize');
      }

      // Attach user data to the request object
      req.user = decoded;
      // Proceed to the next middleware
      next();
    },
  );
};
export default auth;
