/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { TErrorSource } from '../interfaces/interfaces';
import handleZodError from '../error/zodError';
import handelMongoosValidactionError from '../error/mongosValidactionerror';
import handelMongoosValidactionCastError from '../error/handelMongoosValidactionCastError';
import handelMongoosValidactionUnicIdError from '../error/handelMongoosValidactionUnicIdError';
import AppError from '../error/apperror';

// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = error.message || 'Something went wrong.';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'something went wrond',
    },
  ];

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    //main work
    const zodErrorDetails = handleZodError(error);
    statusCode = zodErrorDetails.statusCode;
    message = zodErrorDetails.message;
    errorSource = zodErrorDetails.errorSource;
  } else if (error.name === 'ValidationError') {
    const simplefideError = handelMongoosValidactionError(error);
    statusCode = simplefideError.statusCode;
    message = simplefideError.message;
    errorSource = simplefideError.errorSource;
  } else if (error.name === 'CastError') {
    const simplefideError = handelMongoosValidactionCastError(error);
    statusCode = simplefideError.statusCode;
    message = simplefideError.message;
    errorSource = simplefideError.errorSource;
  } else if (error.code === 11000) {
    const simplefideError = handelMongoosValidactionUnicIdError(error);
    statusCode = simplefideError.statusCode;
    message = simplefideError.message;
    errorSource = simplefideError.errorSource;
  } else if (error instanceof AppError) {
    statusCode = error.StatusCod;
    message = error.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }
  // Respond with error details
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error,
    // stack: config.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace in dev mode only
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
