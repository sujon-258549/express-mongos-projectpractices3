"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controlle_1 = require("./student.controlle");
const router = express_1.default.Router();
router.get('/find-student', student_controlle_1.studentController.findStudent);
router.delete('/:studentId', student_controlle_1.studentController.studentOneDeleted);
router.get('/:studentId', student_controlle_1.studentController.studentOnefind);
exports.studentRouter = router;
