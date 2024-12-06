import { model, Schema } from 'mongoose';
import { TAcadimicDepertment } from './acadimic.depert ment.interface';

export const acadimicDepertmentSchema = new Schema<TAcadimicDepertment>(
  {
    name: {
      type: String,
      required: [true, 'name is Requerd'],
    },
    id: {
      type: Schema.Types.ObjectId,
      required: [true, 'name is Requerd'],
    },
  },
  {
    timestamps: true,
  },
);

export const AcadimicDepertmentModel = model<TAcadimicDepertment>(
  'Acadimicdepertment',
  acadimicDepertmentSchema,
);
