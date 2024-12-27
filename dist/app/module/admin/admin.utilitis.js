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
exports.createIdByAdmin = void 0;
const admin_model_1 = require("./admin.model");
const findAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const findOne = yield admin_model_1.AdminModel.findOne().sort({ id: -1 }).lean();
    return (findOne === null || findOne === void 0 ? void 0 : findOne.id) ? findOne === null || findOne === void 0 ? void 0 : findOne.id : undefined;
});
const createIdByAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = yield findAdminId();
    let newId = 1;
    if (adminId) {
        const splitAdminId = adminId.split('-')[1];
        newId = Number(splitAdminId) + 1;
    }
    const createAdminNewId = `A-${newId.toString().padStart(4, '0')}`;
    return createAdminNewId;
});
exports.createIdByAdmin = createIdByAdmin;
