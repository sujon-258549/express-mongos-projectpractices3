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
    student: z.object({
      //   user: z.string(),
      name: nameSchema,
      email: z.string().email('Invalid email format.'),
      avatar: z.string().url().optional(),
      dateOfBirth: z.union([z.date(), z.string()]),
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
      enrolledDate: z
        .union([
          z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: 'Invalid date string',
          }), // Validates date strings
          z.date(), // Allows Date objects
        ])
        .optional(), // Use optional() if this field isn't always required,
      isActive: z.boolean().default(true),
      guardian: guardianSchema,
      nationality: z.string().optional(),
      religion: z.string().nonempty('Religion is required.'),
      hobbies: z.array(z.string()).optional(),
      extracurriculars: z.array(z.string()).optional(),
      previousSchool: z.string().optional(),
      emergencyContact: z.union([z.number(), z.string()]),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      attendancePercentage: z.number().optional(),
      marks: z.record(z.string(), z.number()).optional(),
      isDeleted: z.boolean().optional(),
      admitionSamester: z.string(),
      acadimicDepertment: z.string(),
      comments: z.string().optional(),
    }),
  }),
});

export const updateStudentValidationSchemaforzod = z.object({
  body: z.object({
    student: z.object({
      name: nameSchema.partial(), // All name fields optional
      email: z.string().email('Invalid email format.').optional(),
      avatar: z.string().url().optional(),
      dateOfBirth: z
        .string({ invalid_type_error: 'Invalid date format.' })
        .optional(),
      gender: z
        .enum(['Male', 'Female', 'Other'], {
          errorMap: () => ({
            message: 'Gender must be Male, Female, or Other.',
          }),
        })
        .optional(),
      phone: z
        .string()
        .length(11, { message: 'Phone number must be exactly 11 characters.' })
        .optional(),
      address: z.string().optional(),
      grade: z.string().optional(),
      section: z.string().optional(),
      enrolledDate: z
        .string({ invalid_type_error: 'Invalid date format.' })
        .optional(),
      isActive: z.boolean().optional(),
      guardian: guardianSchema.optional(), // All guardian fields optional
      nationality: z.string().optional(),
      religion: z.string().optional(),
      hobbies: z.array(z.string()).optional(),
      extracurriculars: z.array(z.string()).optional(),
      previousSchool: z.string().optional(),
      emergencyContact: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      attendancePercentage: z.number().optional(),
      marks: z.record(z.string(), z.number()).optional(),
      isDeleted: z.boolean().optional(),
      admitionSamester: z.string().optional(),
      acadimicDepertment: z.string().optional(),
      comments: z.string().optional(),
    }),
  }),
});

export const studentvalidaction = {
  studentValidationSchemaforzod,
  updateStudentValidationSchemaforzod,
};
