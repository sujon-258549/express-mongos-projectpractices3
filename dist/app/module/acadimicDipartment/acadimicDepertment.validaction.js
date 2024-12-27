"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.acadimicDepertment = void 0;
const zod_1 = require("zod");
const createAcadimicDepentmetnValidactionZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ invalid_type_error: 'Name must be a string' })
            .nonempty('Name is required'),
        acadimicFaculty: zod_1.z
            .string({ invalid_type_error: 'ID must be a string' })
            .nonempty('ID is required'),
    }),
});
const updateAcadimicDepentmetnValidactionZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ invalid_type_error: 'Name must be a string' }).optional(),
        acadimicFaculty: zod_1.z
            .string({ invalid_type_error: 'ID must be a string' })
            .optional(),
    }),
});
exports.acadimicDepertment = {
    createAcadimicDepentmetnValidactionZod,
    updateAcadimicDepentmetnValidactionZod,
};
