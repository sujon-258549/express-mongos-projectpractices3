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
exports.studentServeses = void 0;
const student_model_1 = require("./student.model");
const findAllStudentData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield student_model_1.Student.find();
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const findOnedStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findOne({ id });
    return result;
});
const deletedStudentone = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.updateOne({ id }, { isDeleted: true });
    return result;
});
exports.studentServeses = {
    findAllStudentData,
    findOnedStudent,
    deletedStudentone,
};
