import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import catchAsynch from './catcingAsynch';
import AppError from '../../error/apperror';
import httpStatus from 'http-status';
import config from '../../config';
import { TuserRole } from '../user/user.interfaces';

const auth = (...requerdRoles: TuserRole[]) => {
  return catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      //   send token for clientside
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User is not UnAuthorize');
      }

      //   const decoded = jwt.verify(
      //     token,
      //     config.secret_kye as string,
      //   ) as JwtPayload;
      //   const { userId, userRole, iat } = decoded;
      //   console.log(userId, userRole,iat)
      //   console.log(decoded);

      jwt.verify(token, config.secret_kye as string, (err, decoded) => {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'User is Unauthorized');
        }
        // const userRole = (decoded as JwtPayload).userRole;

        const userRole = decoded?.JwtPayload?.userRole;
        console.log();
        if (requerdRoles && !requerdRoles.includes(userRole)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'User is not UnAuthorize',
          );
        }
        req.user = decoded as JwtPayload; // Ensure decoded is cast properly
      });

      next();
    },
  );
};
export default auth;
