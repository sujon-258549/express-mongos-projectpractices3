import { z } from 'zod';

const guardianSchema = z.object({
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
});

const nameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .regex(/^[A-Z][a-z]*$/, { message: 'First name must be capitalized.' }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, { message: 'Last name must contain only letters.' }),
});

export const studentValidationSchemaforzod = z.object({
  body: z.object({
    name: nameSchema,
    email: z.string().email('Invalid email format.'),
    avatar: z.string().url().optional(),
    dateOfBirth: z.string({ invalid_type_error: 'Invalid date format.' }),
    gender: z.enum(['Male', 'Female', 'Other'], {
      errorMap: () => ({ message: 'Gender must be Male, Female, or Other.' }),
    }),
    phone: z
      .string()
      .length(11, { message: 'Phone number must be exactly 11 characters.' })
      .optional(),
    address: z.string().optional(),
    grade: z.string().nonempty('Grade is required.'),
    section: z.string().optional(),
    enrolledDate: z.string({ invalid_type_error: 'Invalid date format.' }),
    isActive: z.boolean().default(true),
    guardian: guardianSchema,
    nationality: z.string().optional(),
    religion: z.string().nonempty('Religion is required.'),
    hobbies: z.array(z.string()).optional(),
    extracurriculars: z.array(z.string()).optional(),
    previousSchool: z.string().optional(),
    emergencyContact: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    attendancePercentage: z.number().optional(),
    marks: z.record(z.string(), z.number()).optional(),
    isDeleted: z.boolean(),
    comments: z.string().optional(),
  }),
});

export const studentvalidaction = {
  studentValidationSchemaforzod,
};
