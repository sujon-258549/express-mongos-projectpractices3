"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acedimicSemister = void 0;
const express_1 = require("express");
const acadimic_controllers_1 = require("./acadimic.controllers");
const zod_validaction_1 = __importDefault(require("../utility/zod.validaction"));
const acedimic_zod_validaction_1 = require("./acedimic.zod.validaction");
const router = (0, express_1.Router)();
router.post('/create-samester-for-student', (0, zod_validaction_1.default)(acedimic_zod_validaction_1.AcademicSemesterZod.AcademicSemesterSchema), acadimic_controllers_1.accadimicSamesterController.createAcadimicSamester);
router.get('/', acadimic_controllers_1.accadimicSamesterController.findallAcadimicSamester);
router.get('/:_id', acadimic_controllers_1.accadimicSamesterController.findSpicifySamester);
exports.acedimicSemister = router;
