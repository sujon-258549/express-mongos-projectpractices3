import { z } from 'zod';

const facultyZodValidactionSchema = z.object({
  name: z.string({ invalid_type_error: 'Acadimic fuculty must be String' }),
});

export const userValidalidaction = {
  fucaltyZodValidactionSchema: facultyZodValidactionSchema,
};
