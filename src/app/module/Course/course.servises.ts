import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../error/apperror';
import { Tcourses } from './course.interfaces';
import { CourseModel } from './couse.model';

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

// update course
const updateCourse = async (id: string, payload: Partial<Tcourses>) => {
  const { preRepusiteCousere, ...courseRemainingData } = payload;

  const courseDeleted = await CourseModel.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
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
    await CourseModel.findByIdAndUpdate(id, {
      $pull: { preRepusiteCousere: { course: { $in: deletedPreRequisite } } },
    });
    const newPreRequisite = preRepusiteCousere?.filter(
      (el) => el.course && !el.isDeleted,
    );

    await CourseModel.findByIdAndUpdate(id, {
      $push: { preRepusiteCousere: { $each: newPreRequisite } },
    });
  }

  if (preRepusiteCousere && preRepusiteCousere.length > 0) {
    // Handle deletion of prerequisites
    const deletedPreRequisite = preRepusiteCousere
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    if (deletedPreRequisite.length > 0) {
      await CourseModel.findByIdAndUpdate(id, {
        $pull: { preRepusiteCousere: { course: { $in: deletedPreRequisite } } },
      });
    }

    // Handle addition of new prerequisites (ensuring no duplicates)
    const newPreRequisite = preRepusiteCousere.filter(
      (el) => el.course && !el.isDeleted,
    );

    if (newPreRequisite.length > 0) {
      const existingCourse = await CourseModel.findById(id).select(
        'preRepusiteCousere.course',
      );

      const existingCoursesSet = new Set(
        existingCourse?.preRepusiteCousere.map((el) => el.course.toString()),
      );

      const uniqueNewPreRequisite = newPreRequisite.filter(
        (el) => !existingCoursesSet.has(el.course.toString()),
      );

      if (uniqueNewPreRequisite.length > 0) {
        await CourseModel.findByIdAndUpdate(id, {
          $push: {
            preRepusiteCousere: { $each: uniqueNewPreRequisite },
          },
        });
      }
    }
  }

  const result = await CourseModel.findById(id).populate(
    'preRepusiteCousere.course',
  );
  return result;
};

const updateCourse = async (id: string, payload: Partial<Tcourses>) => {
  const { preRepusiteCousere, ...courseRemainingData } = payload;

  // Update the primary course details
  const courseUpdated = await CourseModel.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!courseUpdated) {
    throw new AppError(404, 'Course not found.');
  }

  if (preRepusiteCousere && preRepusiteCousere.length > 0) {
    // Handle deletion of prerequisites
    const deletedPreRequisite = preRepusiteCousere
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    if (deletedPreRequisite.length > 0) {
      await CourseModel.findByIdAndUpdate(id, {
        $pull: { preRepusiteCousere: { course: { $in: deletedPreRequisite } } },
      });
    }

    // Handle addition of new prerequisites (ensuring no duplicates)
    const newPreRequisite = preRepusiteCousere.filter(
      (el) => el.course && !el.isDeleted,
    );

    if (newPreRequisite.length > 0) {
      const existingCourse = await CourseModel.findById(id).select(
        'preRepusiteCousere.course',
      );

      const existingCoursesSet = new Set(
        existingCourse?.preRepusiteCousere.map((el) => el.course.toString()),
      );

      const uniqueNewPreRequisite = newPreRequisite.filter(
        (el) => !existingCoursesSet.has(el.course.toString()),
      );

      if (uniqueNewPreRequisite.length > 0) {
        await CourseModel.findByIdAndUpdate(id, {
          $push: {
            preRepusiteCousere: { $each: uniqueNewPreRequisite },
          },
        });
      }
    }
  }

  // Populate and return the final course details
  const result = await CourseModel.findById(id).populate(
    'preRepusiteCousere.course',
  );

  return result;
};

export const courseServises = {
  createCourse,
  findAllCourse,
  singleFindCourse,
  deletedCourse,
  updateCourse,
};
