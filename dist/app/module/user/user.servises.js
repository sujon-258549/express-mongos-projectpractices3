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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const acedimic_mode_1 = require("../acedimicsamicter/acedimic.mode");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utility_1 = require("./user.utility");
const acadimic_Depertment_model_1 = require("../acadimicDipartment/acadimic.Depertment.model");
const apperror_1 = __importDefault(require("../../error/apperror"));
const utilits_1 = require("../acadimicFaculty/utilits");
const acadimic_Faculty_model_1 = require("../acadimicFaculty/acadimic.Faculty.model");
const admin_utilitis_1 = require("../admin/admin.utilitis");
const admin_model_1 = require("../admin/admin.model");
const createUserServerDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(repit_students);
    const userData = {};
    console.log('inside', password);
    userData.password = password || config_1.default.defult_passwoed;
    //role ser
    userData.role = 'student';
    // Fetch the academic semester for admission
    const admissionSemester = yield acedimic_mode_1.AcademicSamesterModel.findById(payload.admitionSamester);
    if (!admissionSemester) {
        throw new Error('Admission semester not found');
    }
    // Generate a unique student ID
    // step =>1
    const session = yield mongoose_1.default.startSession();
    try {
        // step 2
        session.startTransaction();
        userData.id = yield (0, user_utility_1.genaretStudentId)(admissionSemester);
        //   step >user data
        const newUser = yield user_model_1.UserMainModel.create([userData], { session }); // use session
        //create a student
        if (newUser.length) {
            //   studentData.id = newUser.id;
            payload.user = newUser[0]._id;
            payload.id = newUser[0].id;
        }
        const newStudent = yield student_model_1.Student.create([payload], { session });
        //   commit sesson
        yield session.commitTransaction();
        //  end session
        yield session.endSession();
        return newStudent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
    // const result = await StudentModel.create(repit_students);
});
const createFacultyIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.defult_passwoed;
    //set student role
    userData.role = 'faculty';
    // find academic department info
    const academicDepartment = yield acadimic_Depertment_model_1.AcadimicDepertmentModel.findById(payload.academicDepartment);
    console.log(academicDepartment);
    if (!academicDepartment) {
        throw new apperror_1.default(400, 'Academic department not found');
    }
    // step 1
    const session = yield mongoose_1.default.startSession();
    try {
        // Step 2
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, utilits_1.generateFacultyId)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.UserMainModel.create([userData], { session }); // array
        //create a faculty
        if (!newUser.length) {
            throw new apperror_1.default(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const newFaculty = yield acadimic_Faculty_model_1.AcadimicFucaltyModel.create([payload], {
            session,
        });
        if (!newFaculty.length) {
            throw new apperror_1.default(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const createAdminIntoDB = (password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // create a user object
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || config_1.default.defult_passwoed;
    //set student role
    userData.role = 'admin';
    // step 1
    const session = yield mongoose_1.default.startSession();
    try {
        // Step 2
        session.startTransaction();
        //set  generated id
        userData.id = yield (0, admin_utilitis_1.createIdByAdmin)();
        // create a user (transaction-1)
        const newUser = yield user_model_1.UserMainModel.create([userData], { session }); // array
        //create a faculty
        if (!newUser.length) {
            throw new apperror_1.default(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        console.log(payload.id);
        payload.user = newUser[0]._id; //reference _id
        // create a faculty (transaction-2)
        const newFaculty = yield admin_model_1.AdminModel.create([payload], {
            session,
        });
        if (!newFaculty.length) {
            throw new apperror_1.default(httpStatus.BAD_REQUEST, 'Failed to create faculty');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newFaculty;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
exports.userServises = {
    createUserServerDB,
    createFacultyIntoDB,
    createAdminIntoDB,
};
