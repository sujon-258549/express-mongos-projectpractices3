/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const message = 'Router is Notfound !';

  res.status(statusCode).json({
    success: false,
    message: message,
    Error: 'Pleaces inter rite route',
  });
};

export default notFound;
