import { TFaculty } from './acadimic.Faculty.interfaces';
import { AcadimicFucaltyModel } from './acadimic.Faculty.model';

const createFucalty = async (payload: TFaculty) => {
  try {
    const result = await AcadimicFucaltyModel.create(payload);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findAllFucalty = async () => {
  try {
    const result = await AcadimicFucaltyModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findoneFucalty = async (id: string) => {
  try {
    const result = await AcadimicFucaltyModel.findOne({ id });
    return result;
  } catch (error) {
    console.log(error);
  }
};
const deleteoneFucalty = async (id: string) => {
  try {
    const result = await AcadimicFucaltyModel.deleteOne(
      { id },
      { isDeleted: true },
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const fucaltyServises = {
  createFucalty,
  findAllFucalty,
  findoneFucalty,
  deleteoneFucalty,
};
