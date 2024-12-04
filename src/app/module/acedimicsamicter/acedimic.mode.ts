import { model, Schema } from 'mongoose';
import {
  MonthName,
  TAcademicsamester,
  SamesterCod,
  SamesterName,
} from './interfaces';
import { AcademicSemesterSchema } from './acedimic.zod.validaction';

export const monthNames: MonthName[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const samesterName: SamesterName[] = ['Autom', 'Summer', 'Fall'];
export const samesterCod: SamesterCod[] = ['01', '02', '03'];

export const acedimincModelSchema = new Schema<TAcademicsamester>(
  {
    name: {
      type: String,
      enum: samesterName,
      required: true,
    },
    code: {
      type: String,
      enum: samesterCod, // Restrict to valid codes
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    statindMonth: {
      type: String,
      enum: monthNames,
    },
    endingMonth: {
      type: String,
      enum: monthNames,
    },
  },
  {
    timestamps: true,
  },
);

acedimincModelSchema.pre('save', async function (next) {
  const checkNameAndThisYear = await AcademicModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (checkNameAndThisYear) {
    throw new Error('year and Samester alrady use');
  }
  next();
});

export const AcademicModel = model<TAcademicsamester>(
  'academic',
  acedimincModelSchema,
);
