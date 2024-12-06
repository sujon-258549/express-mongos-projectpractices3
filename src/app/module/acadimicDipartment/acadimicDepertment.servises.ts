import { TAcadimicDepertment } from './acadimic.depert ment.interface';
import { AcadimicDepertmentModel } from './acadimic.Depertment.model';

const createFaculty = async (payload: TAcadimicDepertment) => {
  try {
    const result = await AcadimicDepertmentModel.create(payload);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findAllFaculty = async () => {
  try {
    const result = await AcadimicDepertmentModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findoneFaculty = async (facultyId: string) => {
  console.log(facultyId);
  try {
    const result = await AcadimicDepertmentModel.findById(facultyId);

    return result;
  } catch (error) {
    console.log(error);
  }
};
const deleteoneFaculty = async (facultyId: string) => {
  try {
    const result = await AcadimicDepertmentModel.findByIdAndDelete(facultyId, {
      isDeleted: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const acadimicDepertmentServises = {
  createFaculty,
  findAllFaculty,
  findoneFaculty,
  deleteoneFaculty,
};
