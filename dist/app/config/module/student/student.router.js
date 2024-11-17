"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controlle_1 = require("./student.controlle");
const router = express_1.default.Router();
router.post('/create-student', student_controlle_1.studentController.createStudent);
exports.studentRouter = router;
