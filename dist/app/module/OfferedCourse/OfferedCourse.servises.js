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
exports.OfferedCourseServices = void 0;
const acadimic_Faculty_model_1 = require("./../acadimicFaculty/acadimic.Faculty.model");
const Offercourse_Utils_1 = require("./Offercourse.Utils");
const acadimicDepertment_validaction_1 = require("./../acadimicDipartment/acadimicDepertment.validaction");
const smesterRagistaction_model_1 = require("./../samesterRagistactoin/smesterRagistaction.model");
const OfferedCourse_model_1 = require("./OfferedCourse.model");
const apperror_1 = __importDefault(require("../../error/apperror"));
const acadimic_Depertment_model_1 = require("../acadimicDipartment/acadimic.Depertment.model");
const couse_model_1 = require("../Course/couse.model");
const http_status_1 = __importDefault(require("http-status"));
const createOfferedCourseIntoDB = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty, section, days, startTime, endTime, } = paylod;
    const isSamesterRagistaction = yield smesterRagistaction_model_1.SemesterRegistrationModel.findById(semesterRegistration);
    if (!isSamesterRagistaction) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'semister Ragistaction Not Found');
    }
    const acadimicSamester = isSamesterRagistaction.academicSemester;
    const isacademicFaculty = yield acadimic_Faculty_model_1.AcadimicFucaltyModel.findById(academicFaculty);
    if (!isacademicFaculty) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Acadimic Faculty Not Found');
    }
    const isacademicDepartment = yield acadimic_Depertment_model_1.AcadimicDepertmentModel.findById(academicDepartment);
    if (!isacademicDepartment) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Depertment Not Found');
    }
    const isCourse = yield couse_model_1.CourseModel.findById(course);
    if (!isCourse) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Course Not Found');
    }
    const isFaculty = yield couse_model_1.FacultyModel.findById(faculty);
    if (!isFaculty) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Faculty Not Found');
    }
    console.log(acadimicDepertment_validaction_1.acadimicDepertment);
    const isDepertmentBelongtoFaculty = yield acadimic_Depertment_model_1.AcadimicDepertmentModel.findOne({
        _id: academicDepartment,
        acadimicFaculty: academicFaculty,
    });
    if (!isDepertmentBelongtoFaculty) {
        throw new apperror_1.default(http_status_1.default.BAD_REQUEST, `Faculty ${(isacademicFaculty.name.firstName, isacademicFaculty.name.lastName)} And depertment ${isacademicDepartment.name} Not Match `);
    }
    //   samester exis same samester not create section
    const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection = yield OfferedCourse_model_1.OfferedCourseModel.findOne({
        semesterRegistration,
        course,
        section,
    });
    if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
        throw new apperror_1.default(http_status_1.default.BAD_REQUEST, `Offered course with same section is already exist!`);
    }
    const assignSchedules = OfferedCourse_model_1.OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');
    console.log(assignSchedules);
    const newSehedul = {
        days,
        startTime,
        endTime,
    };
    if ((0, Offercourse_Utils_1.hasTimeConfilge)(yield assignSchedules, newSehedul)) {
        throw new apperror_1.default(http_status_1.default.CONFLICT, `This faculty is not available at that time ! Choose other time or day`);
    }
    //   10:20  -  11:20  after start time and befor end time
    // 10:00 - 11:00
    const result = yield OfferedCourse_model_1.OfferedCourseModel.create(Object.assign(Object.assign({}, paylod), { acadimicSamester }));
    return result;
});
const updateOfferedCourseIntoDB = (id, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const { faculty, days, startTime, endTime } = paylod;
    const isExistOfferCourse = yield OfferedCourse_model_1.OfferedCourseModel.findById(id);
    if (!isExistOfferCourse) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Offer Course Notfound');
    }
    const isExistOfferCourseForFaculty = yield acadimic_Faculty_model_1.AcadimicFucaltyModel.findById(faculty);
    if (!isExistOfferCourseForFaculty) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Faculty not found  !');
    }
    const semesterRegistration = isExistOfferCourse.semesterRegistration;
    const samesterRagistactionStatus = yield smesterRagistaction_model_1.SemesterRegistrationModel.findById(semesterRegistration);
    if ((samesterRagistactionStatus === null || samesterRagistactionStatus === void 0 ? void 0 : samesterRagistactionStatus.status) !== 'UPCOMING') {
        throw new apperror_1.default(http_status_1.default.BAD_REQUEST, 'You cannot update', samesterRagistactionStatus === null || samesterRagistactionStatus === void 0 ? void 0 : samesterRagistactionStatus.status);
    }
    const assignSchedules = OfferedCourse_model_1.OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: { $in: days },
    }).select('days startTime endTime');
    const newSehedul = {
        days,
        startTime,
        endTime,
    };
    if ((0, Offercourse_Utils_1.hasTimeConfilge)(yield assignSchedules, newSehedul)) {
        throw new apperror_1.default(http_status_1.default.CONFLICT, `This faculty is not available at that time ! Choose other time or day`);
    }
    const result = yield OfferedCourse_model_1.OfferedCourseModel.findByIdAndUpdate(id, paylod);
    return result;
});
exports.OfferedCourseServices = {
    createOfferedCourseIntoDB,
    // getAllOfferedCoursesFromDB,             //code spale checker
    // getSingleOfferedCourseFromDB,
    // deleteOfferedCourseFromDB,
    updateOfferedCourseIntoDB,
};
