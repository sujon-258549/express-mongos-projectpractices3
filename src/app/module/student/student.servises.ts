import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/apperror';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

const findAllStudentData = async (query: Record<string, unknown>) => {
  // {email :{regex :query.serchTerm , {$option : i}}}

  const queryObject = { ...query };

  //   search function
  let searchTerm = '';
  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }
  const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'feilds'];

  console.log(query, 'query obj', queryObject);

  //   delete serch tarm
  excludeField.forEach((el) => delete queryObject[el]);

  const serchTarm = Student.find({
    $or: ['email', 'name.firstName'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  const filterData = serchTarm
    .find(queryObject)
    .populate('user')
    .populate('admitionSamester')
    .populate({
      path: 'acadimicDepertment',
      populate: {
        path: 'acadimicFaculty',
      },
    });

  // sort
  let sort = '-createdAt';

  if (query.sort) {
    sort = query.sort as string;
  }

  const sortquery = filterData.sort(sort);

  //   limit
  let limit = 1;

  //   paginate query
  let page = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit) as number;
  }
  if (query.page) {
    page = Number(query.page) as number;
    skip = (page - 1) * limit;
  }

  //   not work
  let feilds = '-__v';
  if (query.field) {
    feilds = (query.field as string).split(',').join(' ');
  }

  console.log(query.feilds);

  const paginateQuery = sortquery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);
  const filedquery = await limitQuery.select(feilds);

  return filedquery;
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
  const updateStudentdata = await Student.findOneAndUpdate(
    { id }, // Query to find the student by ID
    { $set: modifyStudentData }, // Use $set to ensure proper updates
    {
      new: true, // Return the updated document
      runValidators: true, // Ensure data validation
    },
  );
  return updateStudentdata;
};

const findOnedStudent = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('admitionSamester');
  return result;
};

const deletedStudentone = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const studentDeleted = await Student.updateOne(
      { id },
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

export const studentServeses = {
  findAllStudentData,
  findOnedStudent,
  deletedStudentone,
  updateStudent,
};
