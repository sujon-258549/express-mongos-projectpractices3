import catchAsynch from '../utility/catcingAsynch';
import { courseServises } from './course.servises';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';

const createCourse = catchAsynch(async (req, res) => {
  const result = await courseServises.createCourse(req.body);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'course Create success',
    data: result,
  });
});

const findallCourse = catchAsynch(async (req, res) => {
  const result = await courseServises.findAllCourse(req.query); //
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'find all succesfully',
    data: result,
  });
});
const singleFindCourse = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await courseServises.singleFindCourse(id);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'singlefind retrived succesfully',
    data: result,
  });
});
const deleteCourse = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await courseServises.deletedCourse(id);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'delete couser succesfully',
    data: result,
  });
});
// add to
const addtoFacultyCourse = catchAsynch(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServises.addtoFacultyCourse(courseId, req.body);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'faculty add succesfully',
    data: result,
  });
});
// remove to
const removeFacultyCourse = catchAsynch(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServises.removeFacultyCourse(courseId, req.body);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'faculty remove succesfully',
    data: result,
  });
});
const updateCourse = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await courseServises.updateCourse(id, req.body);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Course Update succesfully',
    data: result,
  });
});
const getFacultiesWithCourse = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await courseServises.getFacultiesWithCourseFromDB(id);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Course retrived Success',
    data: result,
  });
});

export const courseController = {
  createCourse,
  findallCourse,
  singleFindCourse,
  deleteCourse,
  updateCourse,
  addtoFacultyCourse,
  removeFacultyCourse,
  getFacultiesWithCourse,
};
