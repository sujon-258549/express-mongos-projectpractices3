import { TFaculty } from './acadimic.Faculty.interfaces';
import { AcadimicFucaltyModel as AcadimicFacultyModel } from './acadimic.Faculty.model';

const createFaculty = async (payload: TFaculty) => {
  try {
    const result = await AcadimicFacultyModel.create(payload);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findAllFaculty = async () => {
  try {
    const result = await AcadimicFacultyModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findoneFaculty = async (facultyId: string) => {
  console.log(facultyId);
  try {
    const result = await AcadimicFacultyModel.findById(facultyId);

    return result;
  } catch (error) {
    console.log(error);
  }
};
const deleteoneFaculty = async (facultyId: string) => {
  try {
    const result = await AcadimicFacultyModel.findByIdAndDelete(facultyId, {
      isDeleted: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const facultyServises = {
  createFaculty,
  findAllFaculty,
  findoneFaculty,
  deleteoneFaculty,
};
