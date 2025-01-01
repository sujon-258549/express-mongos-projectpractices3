import { EnrollCourseServises } from './Enroll.servises';
import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsynch(async (req, res) => {
  const result = await EnrollCourseServises.createEnrollCourseIntoDB(
    req.body,
    req.user,
  );
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Enroll course Create success',
    data: result,
  });
});
const updateEnrollCoutse = catchAsynch(async (req, res) => {
  const result = await EnrollCourseServises.updateEnrollCoutseIntoDB(
    req.body,
    req.user,
  );
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Course Marks success Success',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createOfferedCourse,
  updateEnrollCoutse,
};
