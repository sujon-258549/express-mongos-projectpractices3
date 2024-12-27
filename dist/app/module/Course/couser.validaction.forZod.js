"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseZodValidaction = exports.updataValidactionforCourse = exports.createCourseValidaction = exports.PreRequisiteCourseSchema = void 0;
const zod_1 = require("zod");
// Zod Schema for TPreRepositeCourse
exports.PreRequisiteCourseSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().default(false),
});
// Zod Schema for Tcourses
exports.createCourseValidaction = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(1, 'Title is required')
            .max(100, 'Title must be less than 100 characters'),
        prifix: zod_1.z
            .string()
            .min(1, 'Prefix is required')
            .max(10, 'Prefix must be less than 10 characters'),
        cod: zod_1.z.number().int().min(1, 'Code must be a positive integer'),
        credits: zod_1.z.number().min(0, 'Credits cannot be negative'),
        isDeleted: zod_1.z.boolean().optional(),
        preRepusiteCousere: zod_1.z.array(exports.PreRequisiteCourseSchema).default([]),
    }),
});
exports.updataValidactionforCourse = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        prifix: zod_1.z.string().optional(),
        cod: zod_1.z.number().int().min(1, 'Code must be a positive integer').optional(),
        credits: zod_1.z.number().min(0, 'Credits cannot be negative').optional(),
        isDeleted: zod_1.z.boolean().optional(),
        preRepusiteCousere: zod_1.z
            .array(exports.PreRequisiteCourseSchema)
            .default([])
            .optional(),
    }),
});
exports.courseZodValidaction = {
    createCourseValidaction: exports.createCourseValidaction,
    updataValidactionforCourse: exports.updataValidactionforCourse,
};
