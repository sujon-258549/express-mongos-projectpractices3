import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/apperror';
import { UserMainModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/queryBuilder';

const findAllStudentData = async (query: Record<string, unknown>) => {
  // {email :{regex :query.serchTerm , {$option : i}}}

  //   const queryObject = { ...query };
  const searchBleFild = ['email', 'name.firstName'];

  //   //   search function
  //   let searchTerm = '';
  //   if (query.searchTerm) {
  //     searchTerm = query.searchTerm as string;
  //   }
  //   const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'field'];

  //   //   delete serch tarm
  //   excludeField.forEach((el) => delete queryObject[el]);

  //   const serchTarm = Student.find({
  //     $or: searchBleFild.map((field) => ({
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     })),
  //   });

  //   const filterData = serchTarm
  //     .find(queryObject)
  //     .populate('user')
  //     .populate('admitionSamester')
  //     .populate({
  //       path: 'acadimicDepertment',
  //       populate: {
  //         path: 'acadimicFaculty',
  //       },
  //     });

  //   // sort
  //   let sort = '-createdAt';

  //   if (query.sort) {
  //     sort = query.sort as string;
  //   }

  //   const sortquery = filterData.sort(sort);

  //   //   limit
  //   let limit = 1;

  //   //   paginate query
  //   let page = 1;
  //   let skip = 0;
  //   if (query.limit) {
  //     limit = Number(query.limit) as number;
  //   }
  //   if (query.page) {
  //     page = Number(query.page) as number;
  //     skip = (page - 1) * limit;
  //   }

  //   let field = '-__v';
  //   if (query.field) {
  //     field = (query.field as string).split(',').join(' ');
  //   }

  //   console.log(query.field);

  //   const paginateQuery = sortquery.skip(skip);
  //   const limitQuery = paginateQuery.limit(limit);
  //   const filedquery = await limitQuery.select(field);

  //   return filedquery;

  const student = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admitionSamester')
      .populate({
        path: 'acadimicDepertment', //acadimicDepertment
        populate: {
          path: 'acadimicFaculty',
        },
      }),
    query,
  )
    .search(searchBleFild)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await student.modelQuery;
  // const meta = await student.modelQuery.;
  return { result }; //meta
};

const updateStudent = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, marks, ...remainingStudentData } = payload;

  const modifyStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [kye, values] of Object.entries(name)) {
      modifyStudentData[`name.${kye}`] = values;
    }
  }
  if (marks && Object.keys(marks).length) {
    for (const [kye, values] of Object.entries(marks)) {
      modifyStudentData[`marks.${kye}`] = values;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [kye, values] of Object.entries(guardian)) {
      modifyStudentData[`guardian.${kye}`] = values;
    }
  }
  const updateStudentdata = await Student.findByIdAndUpdate(
    id, // Query to find the student by ID
    { $set: modifyStudentData }, // Use $set to ensure proper updates
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure data validation
    },
  );
  return updateStudentdata;
};

const findOnedStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate('user')
    .populate('admitionSamester');
  return result;
};
const userThisDataFind = async (id: string) => {
  const result = await Student.findById(id)
    .populate('user')
    .populate('admitionSamester');
  return result;
};

// const deletedStudentone = async (id: string) => {
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     // Find the student by ID
//     const student = await Student.findById(id);
//     if (!student) {
//       throw new AppError(404, 'Student not found');
//     }

//     // Mark the student as deleted
//     const studentDeleted = await Student.findByIdAndUpdate(
//       id,
//       { isDeleted: true },
//       { new: true, session },
//     );
//     if (!studentDeleted) {
//       throw new AppError(404, 'Failed to delete student');
//     }

//     // Update the associated user
//     const usertDeleted = await UserMainModel.findOneAndUpdate(
//       { _id: student.user }, // Use the correct reference field
//       { isDeleted: true },
//       { new: true, session },
//     );
//     if (!usertDeleted) {
//       throw new AppError(404, 'Failed to delete associated user');
//     }

//     // Commit transaction
//     await session.commitTransaction();
//     session.endSession();

//     return studentDeleted;
//   } catch (error) {
//     // Rollback transaction
//     await session.abortTransaction();
//     session.endSession();
//     console.error('Error in deletedStudentone:', error);
//     throw error;
//   }
// };
const deletedStudentone = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the student by ID
    const student = await Student.findById(id);
    if (!student) {
      throw new AppError(404, 'Student not found');
    }

    // Mark the student as deleted
    const studentDeleted = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!studentDeleted) {
      throw new AppError(404, 'Failed to delete student');
    }

    // Update the associated user
    const usertDeleted = await UserMainModel.findOneAndUpdate(
      { _id: student.user }, // Use the correct reference field
      { isDeleted: true },
      { new: true, session },
    );
    if (!usertDeleted) {
      throw new AppError(404, 'Failed to delete associated user');
    }

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return studentDeleted;
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();
    console.error('Error in deletedStudentone:', error);
    throw error;
  }
};

export const studentServeses = {
  findAllStudentData,
  findOnedStudent,
  deletedStudentone,
  updateStudent,
  userThisDataFind,
};
