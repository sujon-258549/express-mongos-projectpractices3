"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferedCourseValidations = void 0;
const zod_1 = require("zod");
const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
const createOfferedCourseValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        semesterRegistration: zod_1.z.string(),
        academicFaculty: zod_1.z.string(),
        academicDepartment: zod_1.z.string(),
        course: zod_1.z.string(),
        faculty: zod_1.z.string(),
        section: zod_1.z.number(),
        maxCapacity: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...Days])),
        startTime: timeStringSchema, // HH: MM   00-23: 00-59
        endTime: timeStringSchema,
    })
        .refine((body) => {
        const startTime = new Date(`2001-10-10T${body.startTime}:00`);
        const endTime = new Date(`2001-10-10T${body.endTime}:00`);
        return endTime > startTime;
    }, {
        message: 'Start time should be before End time ! ',
    }),
});
// const updateOfferedCourseValidationSchema = z.object({
//   body: z
//     .object({
//       faculty: z.string(),
//       maxCapacity: z.number(),
//       days: z.array(z.enum([...Days] as [string, ...string[]])),
//       startTime: timeStringSchema, // HH: MM   00-23: 00-59
//       endTime: timeStringSchema,
//     })
//     .refine(
//       (body) => {
//         // startTime : 10:30  => 1970-01-01T10:30
//         //endTime : 12:30  =>  1970-01-01T12:30
//         const start = new Date(`1970-01-01T${body.startTime}:00`);
//         const end = new Date(`1970-01-01T${body.endTime}:00`);
//         return end > start;
//       },
//       {
//         message: 'Start time should be before End time !  ',
//       },
//     ),
// });
const updateOfferedCourseValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        faculty: zod_1.z.string(),
        maxCapacity: zod_1.z.number(),
        days: zod_1.z.array(zod_1.z.enum([...Days])),
        startTime: timeStringSchema, // HH: MM   00-23: 00-59
        endTime: timeStringSchema,
    })
        .refine((body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30
        console.log(body.startTime);
        console.log(body.endTime);
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        console.log(start, 'end', end);
        return end > start;
    }, {
        message: 'Start time should be before End time !  ',
    }),
});
exports.OfferedCourseValidations = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema,
};
