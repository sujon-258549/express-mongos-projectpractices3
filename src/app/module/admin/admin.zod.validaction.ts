import { z } from 'zod';

const Gender = z.enum(['male', 'female', 'other']);
const BloodGroup = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First Name is required')
    .max(20, 'First Name cannot be more than 20 characters'),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last Name is required')
    .max(20, 'Last Name cannot be more than 20 characters'),
});

export const adminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string().min(1, 'Designation is required'),
      name: userNameSchema,
      gender: Gender,
      dateOfBirth: z.string().optional(), // Should be a valid date string
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloogGroup: BloodGroup.optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      profileImg: z
        .string()
        .url('Profile image must be a valid URL')
        .optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
