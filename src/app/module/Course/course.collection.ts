import { Response } from 'express';
import catchAsynch from '../utility/catcingAsynch';
import { courseServises } from './course.servises';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';

const createCourse = catchAsynch(async (req, res) => {
  const result = await courseServises.createCourse(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
  });
});
