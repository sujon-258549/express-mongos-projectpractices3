import { z } from 'zod';

const createLoginUserValidaction = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is Requerd' }),
    password: z.string({ required_error: 'Password is Requerd' }),
  }),
});
const changePassowrdValidaction = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is Requerd' }),
    newPassword: z.string({ required_error: 'new  Password is Requerd' }),
  }),
});

export const authValidaction = {
  createLoginUserValidaction,
  changePassowrdValidaction,
};