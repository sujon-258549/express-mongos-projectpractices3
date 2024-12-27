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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catcingAsynch_1 = __importDefault(require("./catcingAsynch"));
const apperror_1 = __importDefault(require("../../error/apperror"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../user/user.model");
const auth = (...requiredRoles) => {
    return (0, catcingAsynch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // Check if token exists
        if (!token) {
            throw new apperror_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
        }
        console.log(requiredRoles);
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.ACCESS_secret_kye);
        const { userId, userRole } = decoded.JwtPayload;
        const { iat } = decoded;
        if (!decoded) {
            throw new apperror_1.default(http_status_1.default.UNAUTHORIZED, 'User is not authorized');
        }
        const user = yield user_model_1.UserMainModel.isUserExistsByCustomId(userId);
        if (!user) {
            throw new apperror_1.default(http_status_1.default.NOT_FOUND, 'Your User Id is Invalid!');
        }
        const isDeleteUser = yield user_model_1.UserMainModel.isDeleteUser(userId, user.isDeleted);
        if (!isDeleteUser) {
            throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'Your User is Delete!');
        }
        //   get status true
        const isStatusCheck = yield user_model_1.UserMainModel.isStatus(userId);
        if (isStatusCheck) {
            throw new apperror_1.default(http_status_1.default.FORBIDDEN, 'Your User is Blocked!');
        }
        console.log(decoded);
        // Check for required roles
        if (requiredRoles && !(requiredRoles === null || requiredRoles === void 0 ? void 0 : requiredRoles.includes(userRole))) {
            throw new apperror_1.default(http_status_1.default.UNAUTHORIZED, 'User does not have the required permissions');
        }
        // hak token change password time compre
        const passwordChangeAt = user === null || user === void 0 ? void 0 : user.passwordChangeAt;
        const changeTime = new Date(passwordChangeAt).getTime() / 1000;
        console.log(changeTime > iat);
        if (changeTime < iat) {
            throw new apperror_1.default(http_status_1.default.UNAUTHORIZED, 'User is Un Authorize');
        }
        // Attach user data to the request object
        req.user = decoded;
        // Proceed to the next middleware
        next();
    }));
};
exports.default = auth;
