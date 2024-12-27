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
exports.accadimicSamesterController = void 0;
const catcingAsynch_1 = __importDefault(require("../utility/catcingAsynch"));
const send_success_1 = __importDefault(require("../utility/send-success"));
const acedunuc_servises_1 = require("./acedunuc.servises");
const http_status_1 = __importDefault(require("http-status"));
const createAcadimicSamester = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield acedunuc_servises_1.acadimicSamesterServises.createAcedimic(req.body);
    (0, send_success_1.default)(res, {
        statuscod: 200,
        success: true,
        message: 'User created successfully',
        data: result,
    });
}));
const findallAcadimicSamester = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield acedunuc_servises_1.acadimicSamesterServises.findAllsamester();
    (0, send_success_1.default)(res, {
        statuscod: 200,
        success: true,
        message: 'Successfuly Find all data',
        data: result,
    });
}));
const findSpicifySamester = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const result = yield acedunuc_servises_1.acadimicSamesterServises.findSpisifysamester(_id);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.CREATED,
        success: true,
        message: 'Successfuly Find Single data',
        data: result,
    });
}));
exports.accadimicSamesterController = {
    createAcadimicSamester,
    findallAcadimicSamester,
    findSpicifySamester,
};
