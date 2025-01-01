// import { generateFacultyId } from './utilits';
// import { TFaculty } from './acadimic.Faculty.interfaces';
import { FucaltyModel } from './Faculty.model';
import QueryBuilder from '../../builder/queryBuilder';
import mongoose from 'mongoose';
import AppError from '../../error/apperror';
import { UserMainModel } from '../user/user.model';

const FacultySearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
// const createFaculty = async (payload: TFaculty) => {
//   try {
//     const facultyId = await generateFacultyId();
//     const facultyData = {
//       ...payload,
//       id: facultyId, // Ensure the new ID is included
//     };
//     const result = await AcadimicFacultyModel.create(facultyData);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const findAllFaculty = async () => {
//   try {
//     const result = await AcadimicFacultyModel.find();
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

const findAllFaculty = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    FucaltyModel.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const findoneFaculty = async (facultyId: string) => {
  console.log(facultyId);
  try {
    const result = await FucaltyModel.findById(facultyId);

    return result;
  } catch (error) {
    console.log(error);
  }
};
// const deleteoneFaculty = async (facultyId: string) => {
//   try {
//     const result = await AcadimicFacultyModel.findByIdAndDelete(facultyId, {
//       isDeleted: true,
//     });
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

const deleteoneFaculty = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Find the student by ID
    const student = await FucaltyModel.findById(id);
    if (!student) {
      throw new AppError(404, 'Student not found');
    }

    // Mark the student as deleted
    const studentDeleted = await FucaltyModel.findByIdAndUpdate(
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

export const facultyServises = {
  //   createFaculty,
  findAllFaculty,
  findoneFaculty,
  deleteoneFaculty,
};
