import { model, Schema } from 'mongoose';
import { TAcadimicDepertment } from './acadimic.depert ment.interface';

export const acadimicDepertmentSchema = new Schema<TAcadimicDepertment>(
  {
    name: {
      type: String,
      required: [true, 'name is Requerd'],
    },
    acadimicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'name is Requerd'],
      ref: 'Faculty',
    },
  },
  {
    timestamps: true,
  },
);

acadimicDepertmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  console.log(query);
  const isDepertmentExis = await AcadimicDepertmentModel.findOne(query);
  if (!isDepertmentExis) {
    throw new Error('This Depentment Dase not exest');
  }
  next();
});

export const AcadimicDepertmentModel = model<TAcadimicDepertment>(
  'Acadimicdepertment',
  acadimicDepertmentSchema,
);
