import { model, Schema } from 'mongoose';
import { TFaculty } from './acadimic.Faculty.interfaces';

export const acadimicSchema = new Schema<TFaculty>({
  name: String,
});

export const AcadimicFucaltyModel = model<TFaculty>('Fuculty', acadimicSchema);
