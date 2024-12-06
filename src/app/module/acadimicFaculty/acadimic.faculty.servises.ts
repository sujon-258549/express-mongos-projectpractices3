import { TFaculty } from './acadimic.Faculty.interfaces';
import { AcadimicFucaltyModel as AcadimicFacultyModel } from './acadimic.Faculty.model';

const createFucalty = async (payload: TFaculty) => {
  try {
    const result = await AcadimicFacultyModel.create(payload);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findAllFucalty = async () => {
  try {
    const result = await AcadimicFacultyModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findoneFucalty = async (id: string) => {
  try {
    const result = await AcadimicFacultyModel.findOne({ id });
    return result;
  } catch (error) {
    console.log(error);
  }
};
const deleteoneFucalty = async (id: string) => {
  try {
    const result = await AcadimicFacultyModel.deleteOne(
      { id },
      { isDeleted: true },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const facultyServises = {
  createFucalty,
  findAllFucalty,
  findoneFucalty,
  deleteoneFucalty,
};
