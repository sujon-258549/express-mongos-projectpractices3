"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidationSchema = void 0;
const zod_1 = require("zod");
const Gender = zod_1.z.enum(['male', 'female', 'other']);
const BloodGroup = zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
const userNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .min(1, 'First Name is required')
        .max(20, 'First Name cannot be more than 20 characters'),
    middleName: zod_1.z.string().trim().optional(),
    lastName: zod_1.z
        .string()
        .trim()
        .min(1, 'Last Name is required')
        .max(20, 'Last Name cannot be more than 20 characters'),
});
exports.adminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            designation: zod_1.z.string().min(1, 'Designation is required'),
            name: userNameSchema,
            gender: Gender,
            dateOfBirth: zod_1.z.string().optional(), // Should be a valid date string
            email: zod_1.z
                .string()
                .email('Invalid email format')
                .min(1, 'Email is required'),
            contactNo: zod_1.z.string().min(1, 'Contact number is required'),
            emergencyContactNo: zod_1.z
                .string()
                .min(1, 'Emergency contact number is required'),
            bloogGroup: BloodGroup.optional(),
            presentAddress: zod_1.z.string().min(1, 'Present address is required'),
            permanentAddress: zod_1.z.string().min(1, 'Permanent address is required'),
            profileImg: zod_1.z
                .string()
                .url('Profile image must be a valid URL')
                .optional(),
            isDeleted: zod_1.z.boolean().optional(),
        }),
    }),
});
