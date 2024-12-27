"use strict";
// import { NextFunction, Request, RequestHandler, Response } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
// const catchAsynch = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => next(error));
//   };
// };
const catchAsynch = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    };
};
exports.default = catchAsynch;
