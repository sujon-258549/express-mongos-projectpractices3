import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/apperror';
import { UserModel } from '../user/user.model';

const findAllStudentData = async () => {
  try {
    const result = await Student.find()
      .populate('user')
      .populate('admitionSamester')
      .populate({
        path: 'acadimicDepertment',
        populate: {
          path: 'acadimicFaculty',
        },
      });
    return result;
  } catch (error) {
    console.log(error);
  }
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
};
