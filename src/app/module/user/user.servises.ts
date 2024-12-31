/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../config';
import httpStatus from 'http-status';
import { AcademicSamesterModel } from '../acedimicsamicter/acedimic.mode';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interfaces';
import { UserMainModel } from './user.model';
import { genaretStudentId } from './user.utility';
import { TFaculty } from '../acadimicFaculty/acadimic.Faculty.interfaces';
import { AcadimicDepertmentModel } from '../acadimicDipartment/acadimic.Depertment.model';
import AppError from '../../error/apperror';
import { generateFacultyId } from '../acadimicFaculty/utilits';
import { AcadimicFucaltyModel } from '../acadimicFaculty/acadimic.Faculty.model';
import { TAdmin } from '../admin/admin.interfaces';
import { createIdByAdmin } from '../admin/admin.utilitis';
import { AdminModel } from '../admin/admin.model';
import { UserRole } from './user.const';
import { sendImageCludinary } from '../../utils/sendImageTogloudinari';

// eslint-disable-next-line no-unused-vars
const createUserServerDB = async (
  password: string,
  payload: TStudent,
  file: any,
) => {
  //   console.log(repit_students);
  const userData: Partial<TUser> = {};
  console.log('inside', password);
  const imageName = `${payload.name.firstName}`; //${payload.id}
  //   console.log(file);
  const path = file?.path;
  console.log({ path });
  const { secure_url } = await sendImageCludinary(path, imageName);
  console.log(secure_url);
  userData.password = password || (config.defult_passwoed as string);
  userData.email = payload.email;
  //role ser
  userData.role = 'student';
  // Fetch the academic semester for admission
  const admissionSemester = await AcademicSamesterModel.findById(
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
    const newUser = await UserMainModel.create([userData], { session }); // use session
    //create a student
    if (newUser.length) {
      //   studentData.id = newUser.id;
      payload.user = newUser[0]._id;
      payload.id = newUser[0].id;
      payload.avatar = secure_url;
    }
    // image hosting for cludinary

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defult_passwoed as string);
  userData.email = payload.email;
  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcadimicDepertmentModel.findById(
    payload.academicDepartment,
  );

  console.log(academicDepartment);
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  // step 1
  const session = await mongoose.startSession();

  try {
    // Step 2
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserMainModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await AcadimicFucaltyModel.create([payload], {
      session,
    });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.defult_passwoed as string);
  userData.email = payload.email;
  //set student role
  userData.role = 'admin';

  // step 1
  const session = await mongoose.startSession();

  try {
    // Step 2
    session.startTransaction();
    //set  generated id
    userData.id = await createIdByAdmin();

    // create a user (transaction-1)
    const newUser = await UserMainModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    // console.log(payload.id);
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await AdminModel.create([payload], {
      session,
    });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const findThisUserData = async (user: JwtPayload) => {
  const { userId, userRole } = user.JwtPayload; //userRole
  console.log(userId, userRole);

  if (userRole === UserRole.admin) {
    const result = await AdminModel.findOne({ id: userId }).populate('user');
    return result;
  }
  if (userRole === UserRole.faculty) {
    const result = await AcadimicFucaltyModel.findOne({ id: userId }).populate(
      'user',
    );

    return result;
  }
  if (userRole === UserRole.student) {
    const result = await Student.findOne({ id: userId }).populate('user');
    return result;
  }
};

const ChangeUserStautsIntoDb = async (
  id: string,
  paylod: { status: string },
  token: JwtPayload,
) => {
  const { userId } = token.JwtPayload; //userRole
  console.log(userId, paylod);
  const palodId = await AdminModel.findOne({ id });
  if (palodId?.id === userId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Input id ${id} or ${userId} is match`,
    );
  }
  console.log(paylod);
  const result = await UserMainModel.findOneAndUpdate({ id }, paylod, {
    new: true,
  });
  return result;
};

export const userServises = {
  createUserServerDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  findThisUserData,
  ChangeUserStautsIntoDb,
};
