/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

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
  id: string;
  password: string;
  name: FullName;
  email: string;
  avatar?: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phone?: string;
  address?: string;
  grade: string;
  section?: string;
  enrolledDate: string;
  isActive: boolean;
  guardian: Guardian;
  nationality?: string;
  religion?: string;
  hobbies?: string[];
  extracurriculars?: string[];
  previousSchool?: string;
  emergencyContact?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  attendancePercentage?: number;
  marks?: { [subject: string]: number };
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
