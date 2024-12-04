import { z } from 'zod';
import { monthNames, samesterCod, samesterName } from './acedimic.mode';

// Arrays of valid month names, semester names, and semester codes

// Zod schema for TAcademicsamester
export const AcademicSemesterSchema = z.object({
  body: z.object({
    name: z.enum([...samesterName] as [string, ...string[]]), // Ensure 'name' is one of ['Autom', 'Summer', 'Fall']
    code: z.enum([...samesterCod] as [string, ...string[]]), // Ensure 'code' is one of ['01', '02', '03']
    year: z.string(),
    statindMonth: z.enum([...monthNames] as [string, ...string[]]), // Ensure 'statindMonth' is one of valid month names
    endingMonth: z.enum([...monthNames] as [string, ...string[]]), // Ensure 'endingMonth' is one of valid month names
  }),
});

// Type inference for the schema
export const AcademicSemesterZod = {
  AcademicSemesterSchema,
};
