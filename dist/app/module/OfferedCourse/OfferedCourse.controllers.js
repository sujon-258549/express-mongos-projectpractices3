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
exports.OfferedCourseControllers = void 0;
const catcingAsynch_1 = __importDefault(require("../utility/catcingAsynch"));
const send_success_1 = __importDefault(require("../utility/send-success"));
const OfferedCourse_servises_1 = require("./OfferedCourse.servises");
const http_status_1 = __importDefault(require("http-status"));
const createOfferedCourse = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield OfferedCourse_servises_1.OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.CREATED,
        success: true,
        message: 'course Create success',
        data: result,
    });
}));
const updateOfferedCourseIntoDB = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(req.body);
    const result = yield OfferedCourse_servises_1.OfferedCourseServices.updateOfferedCourseIntoDB(id, req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'course Update success',
        data: result,
    });
}));
exports.OfferedCourseControllers = {
    createOfferedCourse,
    // getAllOfferedCoursesFromDB,
    // getSingleOfferedCourseFromDB,
    // deleteOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
};
