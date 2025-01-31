/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

// Guardian Interface
export interface Guardian {
  guardianName?: string;
  guardianPhone?: string;
}

// Name Interface
export interface FullName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

// Student Interface for TypeScript
export interface TStudent {
  user: Types.ObjectId;
  id: string;
  name: FullName;
  email: string;
  profileImg?: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  phone?: string;
  address?: string;
  grade: string;
  section?: string;
  enrolledDate: Date;
  guardian: Guardian;
  nationality?: string;
  religion?: string;
  hobbies?: string[];
  extracurriculars?: string[];
  previousSchool?: string;
  emergencyContact?: number;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  attendancePercentage?: number;
  marks?: { [subject: string]: number };
  admitionSamester: Types.ObjectId;
  acadimicDepertment: Types.ObjectId;
  acadimicFaculty: Types.ObjectId;
  isDeleted: boolean;
  comments?: string;
}

// Static Methods Interface

export interface StudentModel extends Model<TStudent> {
  isStudentExists(id: string): Promise<TStudent | null>;
}

// export interface StudentMethods {
//   isStudentExits(id: string): Promise<Student>;
// }

// export interface StudentModels extends Model<StudentMethods> {
//   myStaticMethod(): number;
// }
