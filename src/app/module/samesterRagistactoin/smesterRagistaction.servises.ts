import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../error/apperror';
import { AcademicSamesterModel } from '../acedimicsamicter/acedimic.mode';
import { TSemesterRegistration } from './samesterRagistaction.interfaces';
import { SemesterRegistrationModel } from './smesterRagistaction.model';

const createRagistaction = async (payload: TSemesterRegistration) => {
  const acadimicSamester = payload.academicSemester;

  const isThereUpcamingorongoing = await SemesterRegistrationModel.findOne({
    $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
  });
  if (isThereUpcamingorongoing) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is Alrady a ${isThereUpcamingorongoing?.status}`,
    );
  }
  const isSamesterRagistaction = await SemesterRegistrationModel.findOne({
    acadimicSamester,
  });

  if (isSamesterRagistaction) {
    throw new AppError(httpStatus.CONFLICT, 'Acadimic Samester Alrady exis!');
  }

  const isExistAcadimincSamester =
    await AcademicSamesterModel.findById(acadimicSamester);
  if (!isExistAcadimincSamester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Acadimic Samester motfound');
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const findAllRagistaction = async (query: Record<string, unknown>) => {
  const semisterQueryAlldata = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semisterQueryAlldata.modelQuery;
  return result;
};

const findoneRagistaction = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

export const ragistactionServises = {
  createRagistaction,
  findAllRagistaction,
  findoneRagistaction,
};
