"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_servises_1 = require("./student.servises");
const findStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_servises_1.studentServeses.findAllStudentData();
        res.status(200).json({
            success: true,
            message: 'Students retrieved successfully',
            result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next(error);
    }
});
const studentOneDeleted = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        // Call the service to delete the student
        const result = yield student_servises_1.studentServeses.deletedStudentone(studentId);
        res.status(200).json({
            success: true,
            message: 'Student deleted successfully',
            result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next(error);
    }
});
const studentOnefind = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        // Call the service to delete the student
        const result = yield student_servises_1.studentServeses.findOnedStudent(studentId);
        res.status(200).json({
            success: true,
            message: 'Student find one successfully',
            result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        next(error);
    }
});
exports.studentController = {
    findStudent,
    studentOneDeleted,
    studentOnefind,
};
