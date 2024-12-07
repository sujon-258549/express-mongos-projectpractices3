/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler } from 'express';

const globalErrorhandlata: ErrorRequestHandler = (error, req, res, next) => {
  const statusCode = 500;
  const message = error.message || 'Something went wrong.';

  res.status(statusCode).json({
    success: false,
    message: message,
    error: error,
  });
};

export default globalErrorhandlata;
