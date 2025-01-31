import { z } from 'zod';
const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      section: z.number(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const startTime = new Date(`2001-10-10T${body.startTime}:00`);
        const endTime = new Date(`2001-10-10T${body.endTime}:00`);
        return endTime > startTime;
      },
      {
        message: 'Start time should be before End time ! ',
      },
    ),
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

const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30
        console.log(body.startTime);
        console.log(body.endTime);
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        console.log(start, 'end', end);
        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});
export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
