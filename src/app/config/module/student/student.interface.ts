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
export interface Student {
  id: string;
  name: FullName;
  email: string;
  avatar?: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  phone?: string;
  address?: string;
  grade: string;
  section?: string;
  enrolledDate: Date;
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
  comments?: string;
}
