import { z } from 'zod';

// Enums
const GenderEnum = z.enum(['male', 'female', 'other']);
const BloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

// User Name Schema
const UserNameSchema = z.object({
  firstName: z
    .string()
    .nonempty('First Name is required')
    .max(20, 'Name cannot be more than 20 characters'),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('Last Name is required')
    .max(20, 'Name cannot be more than 20 characters'),
});

// Main Schema
export const facultyZodValidactionSchema = z.object({
  body: z.object({
    faculty: z.object({
      user: z.string().optional(), // Assuming ObjectId is represented as a string
      designation: z.string().nonempty('Designation is required'),
      name: UserNameSchema,
      gender: GenderEnum,
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email format')
        .nonempty('Email is required'),
      contactNo: z.string().nonempty('Contact number is required'),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency contact number is required'),
      bloogGroup: BloodGroupEnum.optional(),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      profileImg: z.string().url().optional(), // Assuming URLs for profile images
      academicDepartment: z
        .string()
        .nonempty('Academic Department ID is required'),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

// Example Validation
export const userValidalidaction = {
  facultyZodValidactionSchema,
};
