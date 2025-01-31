import QueryBuilder from '../../builder/queryBuilder';
import AppError from '../../error/apperror';
import { AcademicSamesterModel } from '../acedimicsamicter/acedimic.mode';
import { TSemesterRegistration } from './samesterRagistaction.interfaces';
import { SemesterRegistrationModel } from './smesterRagistaction.model';
import httpStatus from 'http-status';

const createRagistaction = async (payload: TSemesterRegistration) => {
  const acadimicSamester = payload.academicSemester;
  console.log(payload);
  const isThereAnyUpcomingOrOngoingSEmester =
    await SemesterRegistrationModel.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOrOngoingSEmester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`,
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
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester notfound');
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

  const meta = semisterQueryAlldata.countTotal();
  const result = await semisterQueryAlldata.modelQuery;
  return { meta, result };
};

const findoneRagistaction = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id);
  return result;
};

const updateStatus = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const currentSemesterStatus = payload.status;
  const requestedStatus = await SemesterRegistrationModel.findById(id);
  if (requestedStatus?.status === currentSemesterStatus) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This samester alrady  ${requestedStatus?.status} close !`,
    );
  }

  if (requestedStatus?.status === 'UPCOMING' && payload.status === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }
  if (requestedStatus?.status === 'ONGOING' && payload.status === 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const ragistactionServises = {
  createRagistaction,
  findAllRagistaction,
  findoneRagistaction,
  updateStatus,
};
