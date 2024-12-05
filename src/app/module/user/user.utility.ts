import { TAcademicsamester } from '../acedimicsamicter/interfaces';
import { UserModel } from './user.model';

const findLastStudent = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ id: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const genaretStudentId = async (payload: TAcademicsamester) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudent();

  const lastStudentSamesterYear = lastStudentId?.substring(0, 4); //2024 10 0001
  const lastStudentSamesterCod = lastStudentId?.substring(4, 6); //2024 10 0001
  const currentSamesterYear = payload.year;
  const currentSamesterCod = payload.code;

  if (
    lastStudentId &&
    lastStudentSamesterCod === currentSamesterCod &&
    lastStudentSamesterYear === currentSamesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
