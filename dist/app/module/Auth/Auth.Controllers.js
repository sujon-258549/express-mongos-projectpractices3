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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const config_1 = __importDefault(require("../../config"));
const catcingAsynch_1 = __importDefault(require("../utility/catcingAsynch"));
const send_success_1 = __importDefault(require("../utility/send-success"));
const Auth_Servises_1 = require("./Auth.Servises");
const http_status_1 = __importDefault(require("http-status"));
const loginUser = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Auth_Servises_1.authServises.createAuth(req.body);
    const { refreshToken, accessToken, needPasswordChenge } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV !== 'development',
        httpOnly: true,
    });
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.CREATED,
        success: true,
        message: 'User login succesfuly',
        data: {
            accessToken,
            needPasswordChenge,
        },
    });
}));
const chengePassword = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = __rest(req.body, []);
    const result = yield Auth_Servises_1.authServises.chengePassword(req.user, passwordData);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.CREATED,
        success: true,
        message: 'Chenge password is success',
        data: result,
    });
}));
const refreshToken = (0, catcingAsynch_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    console.log('refreshToken', refreshToken);
    const result = yield Auth_Servises_1.authServises.refreshTokenUseCreateAccessToken(refreshToken);
    (0, send_success_1.default)(res, {
        statuscod: http_status_1.default.CREATED,
        success: true,
        message: 'Chenge password is success',
        data: result,
    });
}));
exports.authController = {
    loginUser,
    chengePassword,
    refreshToken,
};
