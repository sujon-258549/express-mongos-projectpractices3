import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interfaces';

// Define the User Schema
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needChangePassword: {
      type: Boolean,
      required: true,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['admin', 'faculty', 'student'],
        message: '{VALUE} is not a valid role',
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['in-progress', 'blocked'],
        message: '{VALUE} , is not define',
      },
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Export the User Model
export const UserModel = mongoose.model<TUser>('User', userSchema);
