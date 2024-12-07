/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { path } from 'path';
// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { ErrorRequestHandler } from 'express';
// import { ZodError } from 'zod';

// const globalErrorhandlata: ErrorRequestHandler = (error, req, res, next) => {
//   let statusCode = 500;
//   let message = error.message || 'Something went wrong.';

//   type TErrorSource = {
//     path: string | number;
//     message: string;
//   }[];

//   const errorSource: TErrorSource = [
//     {
//       path: '',
//       message: 'something went wrond',
//     },
//   ];

//   if (error instanceof ZodError) {
//     statusCode: 400;
//     message: 'bad';
//     errorSource = error.errors.map((err) => ({
//       path: err.path.join('.'), // Join path array to create a string (if applicable)
//       message: err.message,
//     }));
//   }
//   res.status(statusCode).json({
//     success: false,
//     message: message,
//     errorSource,
//     error: error,
//   });
// };

// export default globalErrorhandlata;

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = error.message || 'Something went wrong.';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSource: TErrorSource = [];

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation error occurred.';
    errorSource = error.errors.map((err) => ({
      path: err.path.join('.'), // Convert path array to string
      message: err.message,
    }));
  }

  // Respond with error details
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error: process.env.NODE_ENV === 'development' ? error : undefined, // Include error details in dev mode only
  });
};

export default globalErrorHandler;
