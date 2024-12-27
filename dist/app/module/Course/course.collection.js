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
exports.courseController = void 0;
const catcingAsynch_1 = __importDefault(require("../utility/catcingAsynch"));
const course_servises_1 = require("./course.servises");
const send_success_1 = __importDefault(require("../utility/send-success"));
const http_status_1 = __importDefault(require("http-status"));
const createCourse = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_servises_1.courseServises.createCourse(req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.CREATED,
        success: true,
        message: 'course Create success',
        data: result,
    });
}));
const findallCourse = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_servises_1.courseServises.findAllCourse(req.query); //
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'find all succesfully',
        data: result,
    });
}));
const singleFindCourse = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_servises_1.courseServises.singleFindCourse(id);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'singlefind retrived succesfully',
        data: result,
    });
}));
const deleteCourse = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_servises_1.courseServises.deletedCourse(id);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'delete couser succesfully',
        data: result,
    });
}));
// add to
const addtoFacultyCourse = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_servises_1.courseServises.addtoFacultyCourse(courseId, req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'faculty add succesfully',
        data: result,
    });
}));
// remove to
const removeFacultyCourse = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const result = yield course_servises_1.courseServises.removeFacultyCourse(courseId, req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'faculty remove succesfully',
        data: result,
    });
}));
const updateCourse = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield course_servises_1.courseServises.updateCourse(id, req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Course Update succesfully',
        data: result,
    });
}));
exports.courseController = {
    createCourse,
    findallCourse,
    singleFindCourse,
    deleteCourse,
    updateCourse,
    addtoFacultyCourse,
    removeFacultyCourse,
};
