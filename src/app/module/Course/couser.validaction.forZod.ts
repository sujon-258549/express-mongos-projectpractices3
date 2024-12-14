import { z } from 'zod';

// Zod Schema for TPreRepositeCourse
export const PreRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false),
});

// Zod Schema for Tcourses
export const createCourseValidaction = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(100, 'Title must be less than 100 characters'),
    prifix: z
      .string()
      .min(1, 'Prefix is required')
      .max(10, 'Prefix must be less than 10 characters'),
    cod: z.number().int().min(1, 'Code must be a positive integer'),
    credits: z.number().min(0, 'Credits cannot be negative'),
    isDeleted: z.boolean().optional(),
    preRepusiteCousere: z.array(PreRequisiteCourseSchema).default([]),
  }),
});

export const updataValidactionforCourse = z.object({
  body: z.object({
    title: z.string().optional(),
    prifix: z.string().optional(),
    cod: z.number().int().min(1, 'Code must be a positive integer').optional(),
    credits: z.number().min(0, 'Credits cannot be negative').optional(),
    isDeleted: z.boolean().optional(),
    preRepusiteCousere: z
      .array(PreRequisiteCourseSchema)
      .default([])
      .optional(),
  }),
});

export const courseZodValidaction = {
  createCourseValidaction,
  updataValidactionforCourse,
};
