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
  const result = await courseServises.findAllCourse(req.query); //
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'find all succesfully',
    data: result,
  });
});
const singleFindCourse = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await courseServises.singleFindCourse(id);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'singlefind retrived succesfully',
    data: result,
  });
});
const deleteCourse = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await courseServises.deletedCourse(id);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'delete couser succesfully',
    data: result,
  });
});
const updateCourse = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await courseServises.updateCourse(id, req.body);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Course Update succesfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  findallCourse,
  singleFindCourse,
  deleteCourse,
  updateCourse,
};
