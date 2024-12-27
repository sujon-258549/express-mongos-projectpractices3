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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentServeses = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const apperror_1 = __importDefault(require("../../error/apperror"));
const user_model_1 = require("../user/user.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const findAllStudentData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // {email :{regex :query.serchTerm , {$option : i}}}
    //   const queryObject = { ...query };
    const searchBleFild = ['email', 'name.firstName'];
    //   //   search function
    //   let searchTerm = '';
    //   if (query.searchTerm) {
    //     searchTerm = query.searchTerm as string;
    //   }
    //   const excludeField = ['searchTerm', 'sort', 'limit', 'page', 'field'];
    //   //   delete serch tarm
    //   excludeField.forEach((el) => delete queryObject[el]);
    //   const serchTarm = Student.find({
    //     $or: searchBleFild.map((field) => ({
    //       [field]: { $regex: searchTerm, $options: 'i' },
    //     })),
    //   });
    //   const filterData = serchTarm
    //     .find(queryObject)
    //     .populate('user')
    //     .populate('admitionSamester')
    //     .populate({
    //       path: 'acadimicDepertment',
    //       populate: {
    //         path: 'acadimicFaculty',
    //       },
    //     });
    //   // sort
    //   let sort = '-createdAt';
    //   if (query.sort) {
    //     sort = query.sort as string;
    //   }
    //   const sortquery = filterData.sort(sort);
    //   //   limit
    //   let limit = 1;
    //   //   paginate query
    //   let page = 1;
    //   let skip = 0;
    //   if (query.limit) {
    //     limit = Number(query.limit) as number;
    //   }
    //   if (query.page) {
    //     page = Number(query.page) as number;
    //     skip = (page - 1) * limit;
    //   }
    //   let field = '-__v';
    //   if (query.field) {
    //     field = (query.field as string).split(',').join(' ');
    //   }
    //   console.log(query.field);
    //   const paginateQuery = sortquery.skip(skip);
    //   const limitQuery = paginateQuery.limit(limit);
    //   const filedquery = await limitQuery.select(field);
    //   return filedquery;
    const student = new queryBuilder_1.default(student_model_1.Student.find()
        .populate('user')
        .populate('admitionSamester')
        .populate({
        path: 'acadimicDepertment', //acadimicDepertment
        populate: {
            path: 'acadimicFaculty',
        },
    }), query)
        .search(searchBleFild)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield student.modelQuery;
    return result;
});
const updateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, marks } = payload, remainingStudentData = __rest(payload, ["name", "guardian", "marks"]);
    const modifyStudentData = Object.assign({}, remainingStudentData);
    if (name && Object.keys(name).length) {
        for (const [kye, values] of Object.entries(name)) {
            modifyStudentData[`name.${kye}`] = values;
        }
    }
    if (marks && Object.keys(marks).length) {
        for (const [kye, values] of Object.entries(marks)) {
            modifyStudentData[`marks.${kye}`] = values;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [kye, values] of Object.entries(guardian)) {
            modifyStudentData[`guardian.${kye}`] = values;
        }
    }
    const updateStudentdata = yield student_model_1.Student.findByIdAndUpdate(id, // Query to find the student by ID
    { $set: modifyStudentData }, // Use $set to ensure proper updates
    {
        new: true, // Return the updated document
        runValidators: true, // Ensure data validation
    });
    return updateStudentdata;
});
const findOnedStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield student_model_1.Student.findById(id)
        .populate('user')
        .populate('admitionSamester');
    return result;
});
const deletedStudentone = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const studentDeleted = yield student_model_1.Student.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!studentDeleted) {
            throw new apperror_1.default(404, 'some thing wrong');
        }
        const usertDeleted = yield user_model_1.UserMainModel.updateOne({ id }, { isDeleted: true }, { new: true, session });
        if (!usertDeleted) {
            throw new apperror_1.default(404, 'some thing wrong');
        }
        session.commitTransaction();
        session.endSession();
        return studentDeleted;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        console.log(error);
    }
});
exports.studentServeses = {
    findAllStudentData,
    findOnedStudent,
    deletedStudentone,
    updateStudent,
};
