import { path } from 'path';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler } from 'express';

const globalErrorhandlata: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = 500;
  const message = error.message || 'Something went wrong.';

  type TErrorSource = {
    path: string | number;
    message: string;
  };

  const errorSource: TErrorSource = [
    {
      path: '',
      message: 'something went wrond',
    },
  ];
  res.status(statusCode).json({
    success: false,
    message: message,
    errorSource,
    error: error,
  });
};

export default globalErrorhandlata;
