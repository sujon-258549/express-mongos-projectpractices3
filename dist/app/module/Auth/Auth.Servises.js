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
exports.authServises = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apperror_1 = __importDefault(require("../../error/apperror"));
const user_model_1 = require("../user/user.model");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Auth_utils_1 = require("./Auth.utils");
const createAuth = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserMainModel.isUserExistsByCustomId(paylod.id);
    if (!user) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Invalid user ID.');
    }
    const isDeleteUser = yield user_model_1.UserMainModel.isDeleteUser(paylod.id, user.isDeleted);
    if (!isDeleteUser) {
        throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'User account has been deleted.');
    }
    //   get status true
    const isStatusCheck = yield user_model_1.UserMainModel.isStatus(paylod.id);
    if (isStatusCheck) {
        throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'User account is blocked.');
    }
    const password = paylod === null || paylod === void 0 ? void 0 : paylod.password;
    const hasPassword = user === null || user === void 0 ? void 0 : user.password;
    console.log(hasPassword, password);
    if (!(yield user_model_1.UserMainModel.isPasswordMatch(password, hasPassword))) {
        throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'Incorrect password.');
    }
    const JwtPayload = {
        userId: user.id,
        userRole: user.role,
    };
    const accessToken = (0, Auth_utils_1.createToken)(JwtPayload, config_1.default.ACCESS_secret_kye, config_1.default.JWT_EXPIRE_IN_ACCESSTOKEN);
    const refreshToken = (0, Auth_utils_1.createToken)(JwtPayload, config_1.default.JWT_REFRES_TOCEN, config_1.default.JWT_EXPIRE_IN_REFRESS);
    console.log({ accessToken, refreshToken });
    return {
        refreshToken,
        accessToken,
        needPasswordChenge: user.needChangePassword,
    };
});
const chengePassword = (userData, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //   console.log(userData.JwtPayload.userId);
    const user = yield user_model_1.UserMainModel.isUserExistsByCustomId((_a = userData === null || userData === void 0 ? void 0 : userData.JwtPayload) === null || _a === void 0 ? void 0 : _a.userId);
    if (!user) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Invalid user ID.');
    }
    const isDeleteUser = yield user_model_1.UserMainModel.isDeleteUser(userData.JwtPayload.userId, user.isDeleted);
    if (!isDeleteUser) {
        throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'User account has been deleted.');
    }
    //   get status true
    const isStatusCheck = yield user_model_1.UserMainModel.isStatus(userData.JwtPayload.userId);
    if (isStatusCheck) {
        throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'User account is blocked.');
    }
    const password = paylod === null || paylod === void 0 ? void 0 : paylod.oldPassword;
    const hasPassword = user === null || user === void 0 ? void 0 : user.password;
    console.log(password, hasPassword);
    if (!(yield user_model_1.UserMainModel.isPasswordMatch(password, hasPassword))) {
        throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'Incorrect password.');
    }
    const newHasPassword = yield bcrypt_1.default.hash(paylod.newPassword, Number(config_1.default.bcript_has));
    const result = yield user_model_1.UserMainModel.findOneAndUpdate({
        id: userData.JwtPayload.userId,
        role: userData.JwtPayload.userRole,
    }, {
        password: newHasPassword,
        needChangePassword: false,
        passwordChangeAt: new Date(),
    });
    return result;
});
const refreshTokenuseCreateAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_REFRES_TOCEN);
    console.log(decoded);
    const { userId } = decoded.JwtPayload;
    const { iat } = decoded;
    const user = yield user_model_1.UserMainModel.isUserExistsByCustomId(userId);
    if (!user) {
        throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Invalid user ID.');
    }
    const isDeleteUser = yield user_model_1.UserMainModel.isDeleteUser(userId, user.isDeleted);
    if (!isDeleteUser) {
        throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'User account has been deleted.');
    }
    //   get status true
    const isStatusCheck = yield user_model_1.UserMainModel.isStatus(userId);
    if (isStatusCheck) {
        throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'User account is blocked.');
    }
    //   haktoken password change
    const passwordChangeAt = user === null || user === void 0 ? void 0 : user.passwordChangeAt;
    const changeTime = new Date(passwordChangeAt).getTime() / 1000;
    console.log(changeTime > iat);
    if (changeTime < iat) {
        throw new apperror_1.default(http_status_1.default.UNAUTHORIZED, 'Token is no longer valid due to password change.');
    }
    const JwtPayload = {
        userId: user.id,
        userRole: user.role,
    };
    const accessToken = (0, Auth_utils_1.createToken)(JwtPayload, config_1.default.ACCESS_secret_kye, config_1.default.JWT_EXPIRE_IN_ACCESSTOKEN);
    return {
        accessToken,
    };
});
exports.authServises = {
    createAuth,
    chengePassword,
    refreshTokenUseCreateAccessToken: refreshTokenuseCreateAccessToken,
};
