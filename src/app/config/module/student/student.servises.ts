import { StudentModel } from '../student.medel';
import { Student } from './student.interface';

const createStudentServerDB = async (repit_students: Student) => {
  //   console.log(repit_students);
  try {
    const result = await StudentModel.create(repit_students);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const findAllStudentData = async () => {
  try {
    const result = await StudentModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const studentServeses = {
  createStudentServerDB,
  findAllStudentData,
};
