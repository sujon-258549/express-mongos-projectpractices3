import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { OfferedCourseServices } from './OfferedCourse.servises';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsynch(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'offered course Create success',
    data: result,
  });
});

const findallofferedCourse = catchAsynch(async (req, res) => {
  const result = await OfferedCourseServices.findAllofferdCourse(req.query); //
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'find all offered succesfully',
    data: result,
  });
});
const updateOfferedCourseIntoDB = catchAsynch(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'course Update success',
    data: result,
  });
});

const myofferdCourse = catchAsynch(async (req, res) => {
  const result = await OfferedCourseServices.myOfferCourseIntoDB(
    req.user,
    req.query,
  );
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Course retreved success',
    // meta: result.meta,
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  // getAllOfferedCoursesFromDB,
  // getSingleOfferedCourseFromDB,
  // deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  myofferdCourse,
  findallofferedCourse,
};
