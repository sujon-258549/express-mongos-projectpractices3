"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentvalidaction = exports.updateStudentValidationSchemaforzod = exports.studentValidationSchemaforzod = void 0;
const zod_1 = require("zod");
const guardianSchema = zod_1.z.object({
    guardianName: zod_1.z.string().optional(),
    guardianPhone: zod_1.z.string().optional(),
});
const nameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .regex(/^[A-Z][a-z]*$/, { message: 'First name must be capitalized.' }),
    middleName: zod_1.z.string().optional(),
    lastName: zod_1.z
        .string()
        .regex(/^[A-Za-z]+$/, { message: 'Last name must contain only letters.' }),
});
exports.studentValidationSchemaforzod = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            //   user: z.string(),
            name: nameSchema,
            email: zod_1.z.string().email('Invalid email format.'),
            avatar: zod_1.z.string().url().optional(),
            dateOfBirth: zod_1.z.string({ invalid_type_error: 'Invalid date format.' }),
            gender: zod_1.z.enum(['Male', 'Female', 'Other'], {
                errorMap: () => ({ message: 'Gender must be Male, Female, or Other.' }),
            }),
            phone: zod_1.z
                .string()
                .length(11, { message: 'Phone number must be exactly 11 characters.' })
                .optional(),
            address: zod_1.z.string().optional(),
            grade: zod_1.z.string().nonempty('Grade is required.'),
            section: zod_1.z.string().optional(),
            enrolledDate: zod_1.z.string({ invalid_type_error: 'Invalid date format.' }),
            isActive: zod_1.z.boolean().default(true),
            guardian: guardianSchema,
            nationality: zod_1.z.string().optional(),
            religion: zod_1.z.string().nonempty('Religion is required.'),
            hobbies: zod_1.z.array(zod_1.z.string()).optional(),
            extracurriculars: zod_1.z.array(zod_1.z.string()).optional(),
            previousSchool: zod_1.z.string().optional(),
            emergencyContact: zod_1.z.string().optional(),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            attendancePercentage: zod_1.z.number().optional(),
            marks: zod_1.z.record(zod_1.z.string(), zod_1.z.number()).optional(),
            isDeleted: zod_1.z.boolean(),
            admitionSamester: zod_1.z.string(),
            acadimicDepertment: zod_1.z.string(),
            comments: zod_1.z.string().optional(),
        }),
    }),
});
exports.updateStudentValidationSchemaforzod = zod_1.z.object({
    body: zod_1.z.object({
        student: zod_1.z.object({
            name: nameSchema.partial(), // All name fields optional
            email: zod_1.z.string().email('Invalid email format.').optional(),
            avatar: zod_1.z.string().url().optional(),
            dateOfBirth: zod_1.z
                .string({ invalid_type_error: 'Invalid date format.' })
                .optional(),
            gender: zod_1.z
                .enum(['Male', 'Female', 'Other'], {
                errorMap: () => ({
                    message: 'Gender must be Male, Female, or Other.',
                }),
            })
                .optional(),
            phone: zod_1.z
                .string()
                .length(11, { message: 'Phone number must be exactly 11 characters.' })
                .optional(),
            address: zod_1.z.string().optional(),
            grade: zod_1.z.string().optional(),
            section: zod_1.z.string().optional(),
            enrolledDate: zod_1.z
                .string({ invalid_type_error: 'Invalid date format.' })
                .optional(),
            isActive: zod_1.z.boolean().optional(),
            guardian: guardianSchema.optional(), // All guardian fields optional
            nationality: zod_1.z.string().optional(),
            religion: zod_1.z.string().optional(),
            hobbies: zod_1.z.array(zod_1.z.string()).optional(),
            extracurriculars: zod_1.z.array(zod_1.z.string()).optional(),
            previousSchool: zod_1.z.string().optional(),
            emergencyContact: zod_1.z.string().optional(),
            bloodGroup: zod_1.z
                .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
                .optional(),
            attendancePercentage: zod_1.z.number().optional(),
            marks: zod_1.z.record(zod_1.z.string(), zod_1.z.number()).optional(),
            isDeleted: zod_1.z.boolean().optional(),
            admitionSamester: zod_1.z.string().optional(),
            acadimicDepertment: zod_1.z.string().optional(),
            comments: zod_1.z.string().optional(),
        }),
    }),
});
exports.studentvalidaction = {
    studentValidationSchemaforzod: exports.studentValidationSchemaforzod,
    updateStudentValidationSchemaforzod: exports.updateStudentValidationSchemaforzod,
};
