"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidaction = void 0;
const zod_1 = require("zod");
const createLoginUserValidaction = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Id is Requerd' }),
        password: zod_1.z.string({ required_error: 'Password is Requerd' }),
    }),
});
const changePassowrdValidaction = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old password is Requerd' }),
        newPassword: zod_1.z.string({ required_error: 'new  Password is Requerd' }),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});
exports.authValidaction = {
    createLoginUserValidaction,
    changePassowrdValidaction,
    refreshTokenValidationSchema,
};
