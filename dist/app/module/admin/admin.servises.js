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
exports.adminServises = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const admin_model_1 = require("./admin.model");
const apperror_1 = __importDefault(require("../../error/apperror"));
const user_model_1 = require("../user/user.model");
const AdminSearchableFields = [
    'email',
    'id',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];
const getAllAdminsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const adminQuery = new queryBuilder_1.default(admin_model_1.AdminModel.find(), query)
        .search(AdminSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield adminQuery.modelQuery;
    return result;
});
const deletedAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const studentDeleted = yield admin_model_1.AdminModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!studentDeleted) {
            throw new apperror_1.default(404, 'some thing wrong');
        }
        const usertDeleted = yield user_model_1.UserMainModel.updateOne({ id }, { isDeleted: true }, { new: true, session });
        if (!usertDeleted) {
            throw new apperror_1.default(404, 'some thing wrong');
        }
        session.commitTransaction();
        session.endSession();
        return studentDeleted;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        console.log(error);
    }
});
exports.adminServises = {
    getAllAdminsFromDB,
    deletedAdmin,
};
