"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_contrllers_1 = require("./user.contrllers");
const zod_validaction_1 = require("../student/zod.validaction");
const zod_validaction_2 = __importDefault(require("../utility/zod.validaction"));
const acadimic_faculty_validaction_zod_1 = require("../acadimicFaculty/acadimic.faculty.validaction.zod");
const admin_zod_validaction_1 = require("../admin/admin.zod.validaction");
const auth_1 = __importDefault(require("../utility/auth"));
const user_const_1 = require("./user.const");
const router = (0, express_1.Router)();
router.post('/create-student', (0, auth_1.default)(user_const_1.UserRole.admin), (0, zod_validaction_2.default)(zod_validaction_1.studentValidationSchemaforzod), user_contrllers_1.userContoller.creatUser);
router.post('/create-faculty', (0, zod_validaction_2.default)(acadimic_faculty_validaction_zod_1.facultyZodValidactionSchema), user_contrllers_1.userContoller.createFaculty);
router.post('/create-admin', (0, zod_validaction_2.default)(admin_zod_validaction_1.adminValidationSchema), user_contrllers_1.userContoller.createAdmin);
exports.userRouter = router;
