import { model, Schema } from 'mongoose';
import { TAcadimicDepertment } from './acadimic.depert ment.interface';
import AppError from '../../error/apperror';

export const acadimicDepertmentSchema = new Schema<TAcadimicDepertment>(
  {
    name: {
      type: String,
      required: [true, 'name is Requerd'],
      unique: true,
    },
    acadimicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'faculty is Requerd'],
      ref: 'Acadimic-faculty',
    },
  },
  {
    timestamps: true,
  },
);

acadimicDepertmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepertmentExis = await AcadimicDepertmentModel.findOne(query);
  if (!isDepertmentExis) {
    throw new AppError(404, 'This Depentment Dase not exest');
  }
  next();
});

export const AcadimicDepertmentModel = model<TAcadimicDepertment>(
  'Acadimicdepertment',
  acadimicDepertmentSchema,
);
