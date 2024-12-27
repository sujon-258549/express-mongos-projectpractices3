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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const student_servises_1 = require("./student.servises");
const catcingAsynch_1 = __importDefault(require("../utility/catcingAsynch"));
const send_success_1 = __importDefault(require("../utility/send-success"));
const http_status_1 = __importDefault(require("http-status"));
//hairorder function
const findStudent = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_servises_1.studentServeses.findAllStudentData(req.query);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'User retrieved  successfully',
        data: result,
    });
}));
const studentOneDeleted = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    // Call the service to delete the student
    const result = yield student_servises_1.studentServeses.deletedStudentone(studentId);
    res.status(200).json({
        success: true,
        message: 'Student deleted successfully',
        data: result,
    });
}));
const studentOnefind = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    // Call the service to delete the student
    const result = yield student_servises_1.studentServeses.findOnedStudent(studentId);
    res.status(200).json({
        success: true,
        message: 'Student find one successfully',
        data: result,
    });
}));
const updateStudentOnefind = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const { student } = req.body;
    // Call the service to delete the student
    const result = yield student_servises_1.studentServeses.updateStudent(studentId, student);
    res.status(200).json({
        success: true,
        message: 'Student filed update successfully',
        data: result,
    });
}));
exports.studentController = {
    findStudent,
    studentOneDeleted,
    studentOnefind,
    updateStudentOnefind,
};
