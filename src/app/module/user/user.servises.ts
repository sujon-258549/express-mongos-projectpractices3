import mongoose from 'mongoose';
import config from '../../config';
import { AcademicModel } from '../acedimicsamicter/acedimic.mode';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interfaces';
import { UserModel } from './user.model';
import { genaretStudentId } from './user.utility';

const createUserServerDB = async (password: string, payload: TStudent) => {
  //   console.log(repit_students);

  const userData: Partial<TUser> = {};

  userData.password = password || (config.defult_passwoed as string);

  //role ser
  userData.role = 'student';

  // Fetch the academic semester for admission
  const admissionSemester = await AcademicModel.findById(
    payload.admitionSamester,
  );
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  // Generate a unique student ID

  // step =>1
  const session = await mongoose.startSession();
  try {
    // step 2
    session.startTransaction();
    userData.id = await genaretStudentId(admissionSemester);

    //   step >user data
    const newUser = await UserModel.create([userData], { session }); // use session
    //create a student
    if (newUser.length) {
      //   studentData.id = newUser.id;
      payload.user = newUser[0]._id;
      payload.id = newUser[0].id;
    }

    const newStudent = await Student.create([payload], { session });

    //   commit sesson
    await session.commitTransaction();
    //  end session
    await session.endSession();

    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
  // const result = await StudentModel.create(repit_students);
};

export const userServises = {
  createUserServerDB,
};
