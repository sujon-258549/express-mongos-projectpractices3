import { AcademicModel } from './acedimic.mode';
import { TAcademicsamester } from './interfaces';

const createAcedimic = async (payloade: TAcademicsamester) => {
  const result = await AcademicModel.create(payloade);
  return result;
};

export const acadimicSamesterServises = {
  createAcedimic,
};
