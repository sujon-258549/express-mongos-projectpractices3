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
exports.facultyContruller = void 0;
const catcingAsynch_1 = __importDefault(require("../utility/catcingAsynch"));
const send_success_1 = __importDefault(require("../utility/send-success"));
const http_status_1 = __importDefault(require("http-status"));
const acadimic_faculty_servises_1 = require("./acadimic.faculty.servises");
// const createFucalty = catchAsynch(async (req, res) => {
//   const result = await facultyServises.createFaculty(req.body);
//   sendSuccess(res, {
//     statuscod: httpStatus.CREATED,
//     success: true,
//     message: 'Fucalty Created Successfuly',
//     data: result,
//   });
// });
const findAllFaculty = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield acadimic_faculty_servises_1.facultyServises.findAllFaculty(req.query);
    console.log(req.cookies);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Fucalty All find Successfuly',
        data: result,
    });
}));
const findSingleFaculty = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const result = yield acadimic_faculty_servises_1.facultyServises.findoneFaculty(facultyId);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Fucalty single find Successfuly',
        data: result,
    });
}));
const deleteSingleFaculty = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { facultyId } = req.params;
    const result = yield acadimic_faculty_servises_1.facultyServises.deleteoneFaculty(facultyId);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Fucalty deleted Successfuly',
        data: result,
    });
}));
exports.facultyContruller = {
    //   createFucalty,
    findAllFaculty,
    findSingleFaculty,
    deleteSingleFaculty,
};
