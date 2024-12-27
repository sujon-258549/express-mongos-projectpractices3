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
exports.ragistactionServises = void 0;
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const apperror_1 = __importDefault(require("../../error/apperror"));
const acedimic_mode_1 = require("../acedimicsamicter/acedimic.mode");
const smesterRagistaction_model_1 = require("./smesterRagistaction.model");
const http_status_1 = __importDefault(require("http-status"));
const createRagistaction = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const acadimicSamester = payload.academicSemester;
    const isThereAnyUpcomingOrOngoingSEmester = yield smesterRagistaction_model_1.SemesterRegistrationModel.findOne({
        $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
    if (isThereAnyUpcomingOrOngoingSEmester) {
        throw new apperror_1.default(http_status_1.default.BAD_REQUEST, `There is aready an ${isThereAnyUpcomingOrOngoingSEmester.status} registered semester !`);
    }
    const isSamesterRagistaction = yield smesterRagistaction_model_1.SemesterRegistrationModel.findOne({
        acadimicSamester,
    });
    if (isSamesterRagistaction) {
        throw new apperror_1.default(http_status_1.default.CONFLICT, 'Acadimic Samester Alrady exis!');
    }
    const isExistAcadimincSamester = yield acedimic_mode_1.AcademicSamesterModel.findById(acadimicSamester);
    if (!isExistAcadimincSamester) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Acadimic Samester motfound');
    }
    const result = yield smesterRagistaction_model_1.SemesterRegistrationModel.create(payload);
    return result;
});
const findAllRagistaction = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semisterQueryAlldata = new queryBuilder_1.default(smesterRagistaction_model_1.SemesterRegistrationModel.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield semisterQueryAlldata.modelQuery;
    return result;
});
const findoneRagistaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield smesterRagistaction_model_1.SemesterRegistrationModel.findById(id);
    return result;
});
const updateStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const currentSemesterStatus = payload.status;
    const requestedStatus = yield smesterRagistaction_model_1.SemesterRegistrationModel.findById(id);
    if ((requestedStatus === null || requestedStatus === void 0 ? void 0 : requestedStatus.status) === currentSemesterStatus) {
        throw new apperror_1.default(http_status_1.default.BAD_REQUEST, `This samester alrady  ${requestedStatus === null || requestedStatus === void 0 ? void 0 : requestedStatus.status} close !`);
    }
    if ((requestedStatus === null || requestedStatus === void 0 ? void 0 : requestedStatus.status) === 'UPCOMING' && payload.status === 'ENDED') {
        throw new apperror_1.default(http_status_1.default.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    if ((requestedStatus === null || requestedStatus === void 0 ? void 0 : requestedStatus.status) === 'ONGOING' && payload.status === 'UPCOMING') {
        throw new apperror_1.default(http_status_1.default.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    const result = yield smesterRagistaction_model_1.SemesterRegistrationModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.ragistactionServises = {
    createRagistaction,
    findAllRagistaction,
    findoneRagistaction,
    updateStatus,
};
