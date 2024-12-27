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
exports.acadimicDepertmentContruller = void 0;
const catcingAsynch_1 = __importDefault(require("../utility/catcingAsynch"));
const send_success_1 = __importDefault(require("../utility/send-success"));
const acadimicDepertment_servises_1 = require("./acadimicDepertment.servises");
const http_status_1 = __importDefault(require("http-status"));
const createDepertment = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield acadimicDepertment_servises_1.acadimicDepertmentServises.createFaculty(req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.CREATED,
        success: true,
        message: 'Depertment Created Successfuly',
        data: result,
    });
}));
const findAllFaculty = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield acadimicDepertment_servises_1.acadimicDepertmentServises.findAllFaculty();
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Depertment All find Successfuly',
        data: result,
    });
}));
const findSingleFaculty = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { depertmentId } = req.params;
    const result = yield acadimicDepertment_servises_1.acadimicDepertmentServises.findoneFaculty(depertmentId);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Depertment single find Successfuly',
        data: result,
    });
}));
const deleteSingleFaculty = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { depertmentId } = req.params;
    const result = yield acadimicDepertment_servises_1.acadimicDepertmentServises.deleteoneFaculty(depertmentId);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Depertment deleted Successfuly',
        data: result,
    });
}));
const updateSingleDepertment = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { depertmentId } = req.params;
    const updateData = req.body;
    const result = yield acadimicDepertment_servises_1.acadimicDepertmentServises.updateOneFacultyData(depertmentId, updateData);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Depertment Updated Successfuly',
        data: result,
    });
}));
exports.acadimicDepertmentContruller = {
    createDepertment,
    findAllFaculty,
    findSingleFaculty,
    deleteSingleFaculty,
    updateSingleDepertment,
};
