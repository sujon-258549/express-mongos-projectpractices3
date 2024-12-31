import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { EnrollCourseServises } from './Enroll.servises';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsynch(async (req, res) => {
  const result = await EnrollCourseServises.createEnrollCourseIntoDB(
    req.body,
    req.user,
  );
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'course Create success',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createOfferedCourse,
};
