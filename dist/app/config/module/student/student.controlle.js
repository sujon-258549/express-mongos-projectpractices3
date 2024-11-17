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
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.student;
        const result = yield student_servises_1.studentServeses.createStudentServerDB(data);
        res.status(200).json({
            success: true,
            message: 'Student Create is success',
            result: result,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.studentController = {
    createStudent,
};
