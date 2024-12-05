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

export const fucaltyServises = {
  createFucalty,
};
