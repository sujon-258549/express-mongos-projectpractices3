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
exports.userServises = void 0;
const __1 = __importDefault(require("../.."));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const createUserServerDB = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(repit_students);
    try {
        // const studentExists = await Student.isStudentExists(repit_students.id);
        // if (studentExists) {
        //   throw new Error('Student already exists');
        // }
        // mtobject for user
        const userData = {};
        userData.password = password || __1.default.defult_passwoed;
        //role ser
        userData.role = 'student';
        userData.id = '20251000001';
        // const student = new UserModel(userData); //built in interface for mongos interfaces
        // const newUser = student.save();
        //
        const newUser = yield user_model_1.UserModel.create(userData);
        //create a student
        if (Object.keys(newUser).length) {
            studentData.id = newUser.id;
            studentData.user = newUser._id;
        }
        const newStudent = yield student_model_1.Student.create(studentData);
        return newStudent;
        // const result = await StudentModel.create(repit_students);
    }
    catch (error) {
        console.log(error);
    }
});
exports.userServises = {
    createUserServerDB,
};
