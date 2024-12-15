import mongoose from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../error/apperror';
import { TCourseFaculty, Tcourses } from './course.interfaces';
import { CourseFacultyModel, CourseModel } from './couse.model';
import httpStatus from 'http-status';

const createCourse = async (paylod: Tcourses) => {
  const result = await CourseModel.create(paylod);
  return result;
};

const findAllCourse = async (query: Record<string, unknown>) => {
  const serchfild = ['credits', 'cod', 'prifix', 'title'];
  const courseFind = new QueryBuilder(
    CourseModel.find().populate('preRepusiteCousere.course'),
    query,
  )
    .search(serchfild)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseFind.modelQuery;
  return result;
  //   const result = await CourseModel.find().populate('preRepusiteCousere.course');
  //   return result;
};
const singleFindCourse = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRepusiteCousere.course',
  );
  return result;
};
// delete course status
const deletedCourse = async (id: string) => {
  const courseDeleted = await CourseModel.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }, // Returns the updated document
  );

  if (!courseDeleted) {
    throw new AppError(404, 'Course not found or update failed');
  }
  return courseDeleted;
};
// update course facultis
const addtoFacultyCourse = async (
  id: string,
  paylod: Partial<TCourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { facultys: { $each: paylod.facultys } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

// remove course facultis
const removeFacultyCourse = async (
  id: string,
  paylod: Partial<TCourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { facultys: { $in: paylod.facultys } },
    },
    {
      new: true,
    },
  );
  return result;
};

// update course
const updateCourse = async (id: string, payload: Partial<Tcourses>) => {
  const session = await mongoose.startSession();
  try {
    const { preRepusiteCousere, ...courseRemainingData } = payload;

    session.startTransaction();
    const courseDeleted = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );
    if (!courseDeleted) {
      throw new AppError(404, 'Course not found.');
    }
    if (preRepusiteCousere && preRepusiteCousere.length > 0) {
      const deletedPreRequisite = preRepusiteCousere
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      // console.log(deletedPreRequisiteCourse);
      const updateStatus = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRepusiteCousere: { course: { $in: deletedPreRequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!updateStatus) {
        throw new AppError(httpStatus.BAD_REQUEST, 'something wrong');
      }
      const newPreRequisite = preRepusiteCousere?.filter(
        (el) => el.course && !el.isDeleted,
      );

      // duplicate id handle error
      const addtoCourse = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRepusiteCousere: { $each: newPreRequisite } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!addtoCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'something wrong');
      }
    }

    const result = await CourseModel.findById(id).populate(
      'preRepusiteCousere.course',
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    console.log(error);
    throw new AppError(httpStatus.BAD_REQUEST, 'something wrong');
  }
};

export const courseServises = {
  createCourse,
  findAllCourse,
  singleFindCourse,
  deletedCourse,
  updateCourse,
  addtoFacultyCourse,
  removeFacultyCourse,
};
