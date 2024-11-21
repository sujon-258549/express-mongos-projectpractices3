import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentServerDB = async (repit_students: TStudent) => {
  //   console.log(repit_students);
  try {
    const studentExists = await Student.isStudentExists(repit_students.id);
    if (studentExists) {
      throw new Error('Student already exists');
    }
    const student = new Student(repit_students); //built in interface for mongos interfaces
    const result = student.save();
    // const result = await StudentModel.create(repit_students);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const findAllStudentData = async () => {
  try {
    const result = await Student.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const studentServeses = {
  createStudentServerDB,
  findAllStudentData,
};
