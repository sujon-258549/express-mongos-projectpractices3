import { TAcadimicDepertment } from './acadimic.depert ment.interface';
import { AcadimicDepertmentModel } from './acadimic.Depertment.model';

const createFaculty = async (payload: TAcadimicDepertment) => {
  const result = await AcadimicDepertmentModel.create(payload);
  return result;
};
const findAllFaculty = async () => {
  try {
    const result =
      await AcadimicDepertmentModel.find().populate('acadimicFaculty');
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findoneFaculty = async (facultyId: string) => {
  console.log(facultyId);
  try {
    const result =
      await AcadimicDepertmentModel.findById(facultyId).populate(
        'acadimicFaculty',
      );

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

const updateOneFacultyData = async (
  id: string,
  updateData: TAcadimicDepertment,
) => {
  // Use lowercase 'string' for consistency

  const result = await AcadimicDepertmentModel.findByIdAndUpdate(
    id,
    updateData,
    { new: true },
  ); // Convert string _id to ObjectId
  return result;
};

export const acadimicDepertmentServises = {
  createFaculty,
  findAllFaculty,
  findoneFaculty,
  deleteoneFaculty,
  updateOneFacultyData,
};
