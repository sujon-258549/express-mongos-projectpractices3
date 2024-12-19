/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  needChangePassword: boolean;
  role: 'admin' | 'faculty' | 'student';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isStatus(id: string): Promise<TUser>;
  isDeleteUser(id: string, isDeleted: boolean): Promise<TUser>;
  isPasswordMatch(password: string, hasPassword: string): Promise<boolean>;
}
