import mongoose from 'mongoose';
import QueryBuilder from '../../builder/queryBuilder';
import { AdminModel } from './admin.model';
import AppError from '../../error/apperror';
import { UserModel } from '../user/user.model';

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

const deletedAdmin = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const studentDeleted = await AdminModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!studentDeleted) {
      throw new AppError(404, 'some thing wrong');
    }
    const usertDeleted = await UserModel.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!usertDeleted) {
      throw new AppError(404, 'some thing wrong');
    }

    session.commitTransaction();
    session.endSession();
    return studentDeleted;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
  }
};

export const adminServises = {
  getAllAdminsFromDB,
  deletedAdmin,
};
