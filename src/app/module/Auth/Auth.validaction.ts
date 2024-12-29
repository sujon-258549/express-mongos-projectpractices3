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

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'User id is required!',
    }),
    newPassword: z.string({
      required_error: 'User password is required!',
    }),
  }),
});

export const authValidaction = {
  createLoginUserValidaction,
  changePassowrdValidaction,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
