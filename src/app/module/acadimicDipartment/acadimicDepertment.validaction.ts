import { z } from 'zod';

const createAcadimicDepentmetnValidactionZod = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: 'Name must be a string' })
      .nonempty('Name is required'),
    acadimicFaculty: z
      .string({ invalid_type_error: 'ID must be a string' })
      .nonempty('ID is required'),
  }),
});

const updateAcadimicDepentmetnValidactionZod = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'Name must be a string' }).optional(),
    acadimicFaculty: z
      .string({ invalid_type_error: 'ID must be a string' })
      .optional(),
  }),
});

export const acadimicDepertment = {
  createAcadimicDepentmetnValidactionZod,
  updateAcadimicDepentmetnValidactionZod,
};
