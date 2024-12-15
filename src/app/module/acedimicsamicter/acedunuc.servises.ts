import { AcademicSamesterModel } from './acedimic.mode';
import { TAcademicsamester } from './interfaces';

const createAcedimic = async (payloade: TAcademicsamester) => {
  // validaciton samester and cod  no match error show flow down step
  type TacadimicSamsesterMaper = {
    [kye: string]: string;
  };

  const acadimicSamestermaper: TacadimicSamsesterMaper = {
    Autom: '01',
    Summer: '02',
    Fall: '03',
  };

  //   top solition 1one line cod
  // const acadimicSamestermaper: Record<string, string> = {
  //     Autom: '01',
  //     Summer: '02',
  //     Fall: '03',
  //   };

  if (acadimicSamestermaper[payloade.name] !== payloade.code) {
    throw new Error('The semester name and code do not match.');
  }

  const result = await AcademicSamesterModel.create(payloade);
  return result;
};

const findAllsamester = async () => {
  try {
    const result = await AcademicSamesterModel.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};
const findSpisifysamester = async (id: string) => {
  try {
    const result = await AcademicSamesterModel.findById(id);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const acadimicSamesterServises = {
  createAcedimic,
  findAllsamester,
  findSpisifysamester,
};
