import { z } from 'zod';

const createLoginUserValidaction = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is Requerd' }),
    password: z.string({ required_error: 'Password is Requerd' }),
  }),
});

export const authValidaction = {
  createLoginUserValidaction,
};
