import QueryBuilder from '../../builder/queryBuilder';
import { Tcourses } from './course.interfaces';
import { CourseModel } from './couse.model';

const createCourse = async (paylod: Tcourses) => {
  const result = await CourseModel.create(paylod);
  return result;
};
const findAllCourse = async (query: Record<string, unknown>) => {
  const serchfild = ['credits', 'cod', 'prifix', 'title'];
  const result = new QueryBuilder(
    CourseModel.find().populate('preRepusiteCousere'),
    query,
  )
    .search(serchfild)
    .filter()
    .paginate()
    .fields();
  return result;
};
const singleFindCourse = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};
const deletedCourse = async (id: string) => {
  const result = await CourseModel.findOneAndDelete(id);
  return result;
};

export const courseServises = {
  createCourse,
  findAllCourse,
  singleFindCourse,
  deletedCourse,
};
