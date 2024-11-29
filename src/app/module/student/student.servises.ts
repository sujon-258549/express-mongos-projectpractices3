import { Student } from './student.model';

const findAllStudentData = async () => {
  try {
    const result = await Student.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const findOnedStudent = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};
const deletedStudentone = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServeses = {
  findAllStudentData,
  findOnedStudent,
  deletedStudentone,
};
