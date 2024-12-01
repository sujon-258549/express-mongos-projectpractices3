import { model, Schema } from 'mongoose';
import {
  MonthName,
  TAcademicsamester,
  SamesterCod,
  SamesterName,
} from './interfaces';

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

export const acedimincModelSchema = new Schema<TAcademicsamester>({
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
    type: Date,
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
});

export const AcademicModel = model<TAcademicsamester>(
  'academic',
  acedimincModelSchema,
);
