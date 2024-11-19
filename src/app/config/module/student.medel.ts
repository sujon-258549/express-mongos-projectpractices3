import { model, Schema } from 'mongoose';
import { FullName, Guardian, Student } from './student/student.interface';
const GuardianSchema: Schema = new Schema<Guardian>({
  guardianName: {
    type: String,
    required: [false, 'Guardian name is required.'],
  },
  guardianPhone: {
    type: String,
    required: [false, 'Guardian phone number is required.'],
  },
});

const NameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required.'],
    validation: {
      validator: function (value) {
        const formattedValue =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return formattedValue === value;
      },
      message: '{VALUE} is not in a capitalized format.',
    },
  },
  middleName: {
    type: String,
    required: [false, 'Middle name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
});

const StudentSchema = new Schema<Student>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    name: {
      type: NameSchema,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    avatar: {
      type: String,
      required: [false, 'Avatar is required.'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required.'],
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'], //enum use arry
        message: '{VALUE} is not a valid gender.',
      },
      required: [true, 'Gender is required.'],
    },
    phone: {
      type: String,
      required: [false, 'Phone number is required.'],
      maxlength: [11, 'Phone number cannot exceed 11 characters.'],
    },
    address: {
      type: String,
      required: [false, 'Address is required.'],
    },
    grade: {
      type: String,
      required: [true, 'Grade is required.'],
    },
    section: {
      type: String,
      required: [false, 'Section is required.'],
    },
    enrolledDate: {
      type: Date,
      required: [true, 'Enrollment date is required.'],
    },
    isActive: {
      type: Boolean,
      required: [true, 'Active status is required.'],
      default: true,
    },
    guardian: {
      type: GuardianSchema,
      required: [true, 'Guardian details are required.'],
    },
    nationality: {
      type: String,
      required: [false, 'Nationality is required.'],
    },
    religion: {
      type: String,
      required: [true, 'Religion is required.'],
    },
    hobbies: {
      type: [String],
      required: [false, 'Hobbies are required.'],
    },
    extracurriculars: {
      type: [String],
      required: [false, 'Extracurricular activities are required.'],
    },
    previousSchool: {
      type: String,
      required: [false, 'Previous school is required.'],
    },
    emergencyContact: {
      type: String,
      required: [false, 'Emergency contact is required.'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group.',
      },
      required: [false, 'Blood group is not required.'],
    },
    attendancePercentage: {
      type: Number,
      required: [false, 'Attendance percentage is not required.'],
    },
    marks: {
      type: Map,
      of: Number,
      required: [false, 'Marks are not required.'],
    },
    comments: {
      type: String,
      required: [false, 'Comments are not required.'],
    },
  },
  { timestamps: true },
);
export const StudentModel = model<Student>('Student', StudentSchema);
