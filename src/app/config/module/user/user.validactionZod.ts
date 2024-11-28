import { z } from 'zod';

// importent notis
// no post id , role , and , password

// Define the Zod schema for user validation
export const userZodSchema = z.object({
  //   id: z.string({ invalid_type_error: 'ID is required' }), // no input for id client
  password: z.string({ invalid_type_error: 'Password is required' }).optional(),
  //   needChangePassword: z.boolean().default(false), // no use extra cod use alrady model
  //   role: z.enum(['admin', 'faculty', 'student'], {
  //     invalid_type_error: 'Invalid role',         // no use extra cod use alrady model
  //   }),
  //   isDeleted: z.boolean().default(false),
});

// Type inference from Zod schema (if needed)
export const userSchema = {
  userZodSchema,
};
