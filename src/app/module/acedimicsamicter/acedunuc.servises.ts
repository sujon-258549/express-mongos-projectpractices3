import QueryBuilder from '../../builder/queryBuilder';
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

const findAllsamester = async (query: Record<string, unknown>) => {
  const acadimicSamester = new QueryBuilder(
    AcademicSamesterModel.find(),
    query,
  );
};

const student = new QueryBuilder(
  Student.find()
    .populate('user')
    .populate('admitionSamester')
    .populate('acadimicDepertment')
    .populate('acadimicFaculty'),
  query,
)
  .search(searchBleFild)
  .filter()
  .sort()
  .paginate()
  .fields();

const meta = await student.countTotal();
const result = await student.modelQuery;
return { result, meta }; //meta

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
