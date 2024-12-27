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
exports.SemesterRegistrationController = void 0;
const send_success_1 = __importDefault(require("../utility/send-success"));
const smesterRagistaction_servises_1 = require("./smesterRagistaction.servises");
const http_status_1 = __importDefault(require("http-status"));
const createRagistaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield smesterRagistaction_servises_1.ragistactionServises.createRagistaction(req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.CREATED,
        success: true,
        message: 'Samester Ragistaction Create Succes',
        data: result,
    });
});
const findAllRagistaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield smesterRagistaction_servises_1.ragistactionServises.findAllRagistaction(req === null || req === void 0 ? void 0 : req.query);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Samester Ragistaction Retrived Success',
        data: result,
    });
});
const findoneRagistaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield smesterRagistaction_servises_1.ragistactionServises.findoneRagistaction(id);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Samester Ragistaction Retrived Success',
        data: result,
    });
});
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield smesterRagistaction_servises_1.ragistactionServises.updateStatus(id, req.body);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.OK,
        success: true,
        message: 'Samester Ragistaction Update Success',
        data: result,
    });
});
exports.SemesterRegistrationController = {
    createRagistaction,
    findAllRagistaction,
    findoneRagistaction,
    updateStatus,
};
