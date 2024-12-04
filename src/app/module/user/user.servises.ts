import config from '../../config';
import { AcademicModel } from '../acedimicsamicter/acedimic.mode';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interfaces';
import { UserModel } from './user.model';
import { genaretStudentId } from './user.utility';

const createUserServerDB = async (password: string, payload: TStudent) => {
  //   console.log(repit_students);
  try {
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
    userData.id = await genaretStudentId(admissionSemester);

    const newUser = await UserModel.create(userData);
    //create a student
    if (Object.keys(newUser).length) {
      //   studentData.id = newUser.id;
      payload.user = newUser._id;
    }

    const newStudent = await Student.create(payload);
    return newStudent;

    // const result = await StudentModel.create(repit_students);
  } catch (error) {
    console.log(error);
  }
};

export const userServises = {
  createUserServerDB,
};
