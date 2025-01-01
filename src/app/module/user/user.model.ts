/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose';
import { TUser, UserModel } from './user.interfaces';
import bcrypt from 'bcrypt';
import config from '../../config';
import { Userstatus } from './user.const';

// Define the User Schema
const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needChangePassword: {
      type: Boolean,
      required: true,
      default: true,
    },
    passwordChangeAt: {
      type: Date,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['supperAdmin', 'admin', 'faculty', 'student'],
        message: '{VALUE} is not a valid role',
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: Userstatus,
        message: '{VALUE} , is not define',
      },
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
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
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(this, 'Student Create is Success');
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await UserMainModel.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatch = async function (password, hasPassword) {
  return await bcrypt.compare(password, hasPassword);
};
userSchema.statics.isStatus = async function (id: string) {
  const finddata = await UserMainModel.findOne({ id });
  return finddata?.status === 'blocked';
};
userSchema.statics.isDeleteUser = async function (
  id: string,
  isDeleted: boolean,
) {
  return await UserMainModel.findOne({ id, isDeleted });
};

// Export the User Model
export const UserMainModel = mongoose.model<TUser, UserModel>(
  'User',
  userSchema,
);
