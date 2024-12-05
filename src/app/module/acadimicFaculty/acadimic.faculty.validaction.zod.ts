import { required } from 'joi';
import { z } from 'zod';

const fucaltyZodValidactionSchema = z.object({
  name: z.string({ invalid_type_error: 'Acadimic fuculty must be String' }),
  required: true,
});

export const userValidalidaction = {
  fucaltyZodValidactionSchema,
};
