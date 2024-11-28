/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose';
import { TUser } from './user.interfaces';
import bcrypt from 'bcrypt';
import config from '../..';

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

// // middleware use for mongoose
userSchema.pre('save', async function name(next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcript_has));
  console.log(this, 'student create prosasing');
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'Student Create is Success');
  next();
});

// Export the User Model
export const UserModel = mongoose.model<TUser>('User', userSchema);
