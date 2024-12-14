import catchAsynch from '../utility/catcingAsynch';
import { courseServises } from './course.servises';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';

const createCourse = catchAsynch(async (req, res) => {
  const result = await courseServises.createCourse(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'course Create success',
    data: result,
  });
});
const findallCourse = catchAsynch(async (req, res) => {
  const result = await courseServises.createCourse(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'course Create success',
    data: result,
  });
});
const singleFindCourse = catchAsynch(async (req, res) => {
  const result = await courseServises.findAllCourse(req.query);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'course Create success',
    data: result,
  });
});
const deleteCourse = catchAsynch(async (req, res) => {
  const result = await courseServises.singleFindCourse(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'course Create success',
    data: result,
  });
});

export const courseController = {
  createCourse,
  findallCourse,
  singleFindCourse,
  deleteCourse,
};
