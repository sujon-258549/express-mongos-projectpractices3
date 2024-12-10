import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interfaces';

export const adminModelSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AdminModel = model<TAdmin>('Admin', adminModelSchema);
