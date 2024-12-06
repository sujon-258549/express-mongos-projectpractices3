import { string, z } from 'zod';

const acadimicDepentmetnValidactionZod = z.object({
  name: string({ invalid_type_error: 'Name must be String' }),
  id: string({ invalid_type_error: 'Id Must be string' }),
});

export const acadimicDepertment = {
  acadimicDepentmetnValidactionZod,
};
