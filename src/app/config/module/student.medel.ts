import { model, Schema } from 'mongoose';
import { FullName, Guardian, Student } from './student/student.interface';
const GuardianSchema: Schema = new Schema<Guardian>({
  guardianName: { type: String, required: false },
  guardianPhone: { type: String, required: false },
});

const NameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  lastName: { type: String, required: true },
});

const StudentSchema = new Schema<Student>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: NameSchema, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: false },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    grade: { type: String, required: true },
    section: { type: String, required: false },
    enrolledDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true },
    guardian: { type: GuardianSchema, required: false },
    nationality: { type: String, required: false },
    religion: { type: String, required: false },
    hobbies: { type: [String], required: false },
    extracurriculars: { type: [String], required: false },
    previousSchool: { type: String, required: false },
    emergencyContact: { type: String, required: false },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: false,
    },
    attendancePercentage: { type: Number, required: false },
    marks: { type: Map, of: Number, required: false },
    comments: { type: String, required: false },
  },
  { timestamps: true }, // Adds `createdAt` and `updatedAt` fields
);
export const StudentModel = model<Student>('Student', StudentSchema);
