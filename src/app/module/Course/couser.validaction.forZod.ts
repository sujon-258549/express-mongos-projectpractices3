import { z } from 'zod';

// Zod Schema for TPreRepositeCourse
export const PreRequisiteCourseSchema = z.object({
  course: z.string({
    message: 'id is requard',
  }),
  isDeleted: z.boolean().default(false),
});

// Zod Schema for Tcourses
export const CourseSchemaValidactionZod = z.object({
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
  preRepusiteCousere: z.array(PreRequisiteCourseSchema).default([]),
});

export const courseZodValidaction = {
  CourseSchemaValidactionZod,
};
