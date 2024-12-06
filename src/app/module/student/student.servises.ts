import { Student } from './student.model';

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
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServeses = {
  findAllStudentData,
  findOnedStudent,
  deletedStudentone,
};
