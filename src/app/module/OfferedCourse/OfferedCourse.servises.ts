import { Tcourses } from '../Course/course.interfaces';
import { OfferedCourseModel } from './OfferedCourse.model';

const createOfferedCourseIntoDB = async (paylod: Tcourses) => {
  const result = await OfferedCourseModel.create(paylod);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  // getAllOfferedCoursesFromDB,
  // getSingleOfferedCourseFromDB,
  // deleteOfferedCourseFromDB,
  // updateOfferedCourseIntoDB,
};
