import { Types } from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date | string;
  endDate: Date | string;
  minCredit: number;
  maxCredit: number;
};
