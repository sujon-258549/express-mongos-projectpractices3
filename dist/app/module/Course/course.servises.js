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
exports.courseServises = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const apperror_1 = __importDefault(require("../../error/apperror"));
const couse_model_1 = require("./couse.model");
const http_status_1 = __importDefault(require("http-status"));
const createCourse = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couse_model_1.CourseModel.create(paylod);
    return result;
});
const findAllCourse = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const serchfild = ['credits', 'cod', 'prifix', 'title'];
    const courseFind = new queryBuilder_1.default(couse_model_1.CourseModel.find().populate('preRepusiteCousere.course'), query)
        .search(serchfild)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseFind.modelQuery;
    return result;
    //   const result = await CourseModel.find().populate('preRepusiteCousere.course');
    //   return result;
});
const singleFindCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couse_model_1.CourseModel.findById(id).populate('preRepusiteCousere.course');
    return result;
});
// delete course status
const deletedCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const courseDeleted = yield couse_model_1.CourseModel.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    if (!courseDeleted) {
        throw new apperror_1.default(404, 'Course not found or update failed');
    }
    return courseDeleted;
});
// update course facultis
const addtoFacultyCourse = (id, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couse_model_1.FacultyModel.findByIdAndUpdate(id, {
        course: id,
        $addToSet: { facultys: { $each: paylod.facultys } },
    }, {
        upsert: true,
        new: true,
    });
    return result;
});
// remove course facultis
const removeFacultyCourse = (id, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield couse_model_1.FacultyModel.findByIdAndUpdate(id, {
        $pull: { facultys: { $in: paylod.facultys } },
    }, {
        new: true,
    });
    return result;
});
// update course
const updateCourse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        const { preRepusiteCousere } = payload, courseRemainingData = __rest(payload, ["preRepusiteCousere"]);
        session.startTransaction();
        const courseDeleted = yield couse_model_1.CourseModel.findByIdAndUpdate(id, courseRemainingData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!courseDeleted) {
            throw new apperror_1.default(404, 'Course not found.');
        }
        if (preRepusiteCousere && preRepusiteCousere.length > 0) {
            const deletedPreRequisite = preRepusiteCousere
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);
            // console.log(deletedPreRequisiteCourse);
            const updateStatus = yield couse_model_1.CourseModel.findByIdAndUpdate(id, {
                $pull: {
                    preRepusiteCousere: { course: { $in: deletedPreRequisite } },
                },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!updateStatus) {
                throw new apperror_1.default(http_status_1.default.BAD_REQUEST, 'something wrong');
            }
            const newPreRequisite = preRepusiteCousere === null || preRepusiteCousere === void 0 ? void 0 : preRepusiteCousere.filter((el) => el.course && !el.isDeleted);
            // duplicate id handle error
            const addtoCourse = yield couse_model_1.CourseModel.findByIdAndUpdate(id, {
                $addToSet: { preRepusiteCousere: { $each: newPreRequisite } },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!addtoCourse) {
                throw new apperror_1.default(http_status_1.default.BAD_REQUEST, 'something wrong');
            }
        }
        const result = yield couse_model_1.CourseModel.findById(id).populate('preRepusiteCousere.course');
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        session.abortTransaction();
        session.endSession();
        console.log(error);
        throw new apperror_1.default(http_status_1.default.BAD_REQUEST, 'something wrong');
    }
});
exports.courseServises = {
    createCourse,
    findAllCourse,
    singleFindCourse,
    deletedCourse,
    updateCourse,
    addtoFacultyCourse,
    removeFacultyCourse,
};
