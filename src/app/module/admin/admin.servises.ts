import mongoose from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { AdminModel } from './admin.model';
import AppError from '../../error/apperror';
import { UserMainModel } from '../user/user.model';

const AdminSearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModel.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

// const deletedAdmin = async (id: string) => {
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const studentDeleted = await AdminModel.findByIdAndUpdate(
//       id,
//       { isDeleted: true },
//       { new: true, session },
//     );
//     if (!studentDeleted) {
//       throw new AppError(404, 'some thing wrong');
//     }
//     const usertDeleted = await UserMainModel.updateOne(
//       { id },
//       { isDeleted: true },
//       { new: true, session },
//     );
//     if (!usertDeleted) {
//       throw new AppError(404, 'some thing wrong');
//     }

//     session.commitTransaction();
//     session.endSession();
//     return studentDeleted;
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     console.log(error);
//   }
// };
const deletedAdmin = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the student by ID
    const student = await AdminModel.findById(id);
    if (!student) {
      throw new AppError(404, 'Student not found');
    }

    // Mark the student as deleted
    const studentDeleted = await AdminModel.findByIdAndUpdate(
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

export const adminServises = {
  getAllAdminsFromDB,
  deletedAdmin,
};
