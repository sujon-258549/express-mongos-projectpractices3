/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorSource } from '../interfaces/interfaces';

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

  //   next work defarent file this cod write
  const handleZodError = (zodError: ZodError) => {
    const formattedErrors: TErrorSource = zodError.issues.map(
      (issue: ZodIssue) => ({
        path: issue.path[issue.path.length - 1] || 'unknown',
        message: issue.message,
      }),
    );

    return {
      statusCode: 400,
      message: 'Validation error occurred.',
      errorSource: formattedErrors,
    };
  };

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    //main work
    const zodErrorDetails = handleZodError(error);
    statusCode = zodErrorDetails.statusCode;
    message = zodErrorDetails.message;
    errorSource = zodErrorDetails.errorSource;
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
