import { z } from 'zod';

const zodSchemaValidaction = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const adiminValidaction = {
  zodSchemaValidaction,
};
