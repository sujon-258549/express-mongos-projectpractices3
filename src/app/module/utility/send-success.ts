import { Response } from 'express';

interface Tsent<T> {
  statuscod: number;
  success: boolean;
  message?: string;
  data: T;
}

const sendSuccess = <T>(res: Response, data: Tsent<T>) => {
  res.status(data.statuscod).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendSuccess;
