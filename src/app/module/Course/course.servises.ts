import { Tcourses } from './course.interfaces';
import { CourseModel } from './couse.model';

const createCourse = async (paylod: Tcourses) => {
  const result = await CourseModel.create(paylod);
  return result;
};

export const courseServises = {
  createCourse,
};
