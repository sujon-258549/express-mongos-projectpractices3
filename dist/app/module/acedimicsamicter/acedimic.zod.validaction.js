"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterZod = exports.AcademicSemesterSchema = void 0;
const zod_1 = require("zod");
const acedimic_mode_1 = require("./acedimic.mode");
// Arrays of valid month names, semester names, and semester codes
// Zod schema for TAcademicsamester
exports.AcademicSemesterSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...acedimic_mode_1.samesterName]), // Ensure 'name' is one of ['Autom', 'Summer', 'Fall']
        code: zod_1.z.enum([...acedimic_mode_1.samesterCod]), // Ensure 'code' is one of ['01', '02', '03']
        year: zod_1.z.string(),
        statindMonth: zod_1.z.enum([...acedimic_mode_1.monthNames]), // Ensure 'statindMonth' is one of valid month names
        endingMonth: zod_1.z.enum([...acedimic_mode_1.monthNames]), // Ensure 'endingMonth' is one of valid month names
    }),
});
// Type inference for the schema
exports.AcademicSemesterZod = {
    AcademicSemesterSchema: exports.AcademicSemesterSchema,
};
