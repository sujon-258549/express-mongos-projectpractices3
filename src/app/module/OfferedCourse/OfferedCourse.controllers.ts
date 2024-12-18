import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { OfferedCourseServices } from './OfferedCourse.servises';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsynch(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'course Create success',
    data: result,
  });
});
const updateOfferedCourseIntoDB = catchAsynch(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'course Update success',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  // getAllOfferedCoursesFromDB,
  // getSingleOfferedCourseFromDB,
  // deleteOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
};
