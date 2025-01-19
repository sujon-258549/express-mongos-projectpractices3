import { Response } from 'express';
type Tmeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

interface Tsent<T> {
  statuscode: number;
  success: boolean;
  message?: string;
  meta?: Tmeta;
  data?: T;
}

const sendSuccess = <T>(res: Response, data: Tsent<T>) => {
  res.status(data.statuscode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default sendSuccess;
