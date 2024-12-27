"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidalidaction = exports.facultyZodValidactionSchema = void 0;
const zod_1 = require("zod");
// Enums
const GenderEnum = zod_1.z.enum(['male', 'female', 'other']);
const BloodGroupEnum = zod_1.z.enum([
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
]);
// User Name Schema
const UserNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .nonempty('First Name is required')
        .max(20, 'Name cannot be more than 20 characters'),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .nonempty('Last Name is required')
        .max(20, 'Name cannot be more than 20 characters'),
});
// Main Schema
exports.facultyZodValidactionSchema = zod_1.z.object({
    body: zod_1.z.object({
        faculty: zod_1.z.object({
            user: zod_1.z.string().optional(), // Assuming ObjectId is represented as a string
            designation: zod_1.z.string().nonempty('Designation is required'),
            name: UserNameSchema,
            gender: GenderEnum,
            dateOfBirth: zod_1.z.string().optional(),
            email: zod_1.z
                .string()
                .email('Invalid email format')
                .nonempty('Email is required'),
            contactNo: zod_1.z.string().nonempty('Contact number is required'),
            emergencyContactNo: zod_1.z
                .string()
                .nonempty('Emergency contact number is required'),
            bloogGroup: BloodGroupEnum.optional(),
            presentAddress: zod_1.z.string().nonempty('Present address is required'),
            permanentAddress: zod_1.z.string().nonempty('Permanent address is required'),
            profileImg: zod_1.z.string().url().optional(), // Assuming URLs for profile images
            academicDepartment: zod_1.z
                .string()
                .nonempty('Academic Department ID is required'),
            isDeleted: zod_1.z.boolean().optional(),
        }),
    }),
});
// Example Validation
exports.userValidalidaction = {
    facultyZodValidactionSchema: exports.facultyZodValidactionSchema,
};
