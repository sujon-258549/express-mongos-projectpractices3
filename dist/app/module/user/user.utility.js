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
Object.defineProperty(exports, "__esModule", { value: true });
exports.genaretStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.UserMainModel.findOne({
        role: 'student',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({ id: -1 })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
});
const genaretStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastStudentId = yield findLastStudent();
    const lastStudentSamesterYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4); //2024 10 0001
    const lastStudentSamesterCod = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6); //2024 10 0001
    const currentSamesterYear = payload.year; //current year
    const currentSamesterCod = payload.code; //current samester cod
    if (lastStudentId &&
        lastStudentSamesterCod === currentSamesterCod &&
        lastStudentSamesterYear === currentSamesterYear) {
        currentId = lastStudentId.substring(6);
        console.log(currentId);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.genaretStudentId = genaretStudentId;
