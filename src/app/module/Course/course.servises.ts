import { CourseModel } from './couse.model';

const createCourse = async () => {
  const result = await CourseModel.create();
  return result;
};

export const courseServises = {
  createCourse,
};
