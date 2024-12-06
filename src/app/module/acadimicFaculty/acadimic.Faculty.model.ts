import { model, Schema } from 'mongoose';
import { TFaculty } from './acadimic.Faculty.interfaces';

export const acadimicSchema = new Schema<TFaculty>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AcadimicFucaltyModel = model<TFaculty>('Faculty', acadimicSchema);
