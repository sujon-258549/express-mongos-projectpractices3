import config from '../..';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interfaces';
import { UserModel } from './user.model';

const createUserServerDB = async (password: string, studentData: TStudent) => {
  //   console.log(repit_students);
  try {
    // const studentExists = await Student.isStudentExists(repit_students.id);
    // if (studentExists) {
    //   throw new Error('Student already exists');
    // }

    // mtobject for user
    const userData: Partial<TUser> = {};

    userData.password = password || (config.defult_passwoed as string);

    //role ser
    userData.role = 'student';
    userData.id = '20251000001';

    // const student = new UserModel(userData); //built in interface for mongos interfaces
    // const newUser = student.save();
    //
    const newUser = await UserModel.create(userData);

    //create a student
    if (Object.keys(newUser).length) {
      studentData.id = newUser.id;
      studentData.user = newUser._id;
    }

    const newStudent = await Student.create(studentData);
    return newStudent;

    // const result = await StudentModel.create(repit_students);
  } catch (error) {
    console.log(error);
  }
};

export const userServises = {
  createUserServerDB,
};
