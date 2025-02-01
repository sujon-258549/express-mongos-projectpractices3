import mongoose, { Schema } from 'mongoose';
import { TSemesterRegistration } from './samesterRagistaction.interfaces';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'academic-samester',
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      default: 'UPCOMING',
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistrationModel = mongoose.model<TSemesterRegistration>(
  'SemesterRegistration',
  semesterRegistrationSchema,
);
