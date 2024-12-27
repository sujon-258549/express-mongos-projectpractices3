"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_validaction_1 = __importDefault(require("../utility/zod.validaction"));
const Auth_validaction_1 = require("./Auth.validaction");
const Auth_Controllers_1 = require("./Auth.Controllers");
const auth_1 = __importDefault(require("../utility/auth"));
const user_const_1 = require("../user/user.const");
const router = express_1.default.Router();
router.post('/login', (0, zod_validaction_1.default)(Auth_validaction_1.authValidaction.createLoginUserValidaction), Auth_Controllers_1.authController.loginUser);
router.post('/change-password', (0, auth_1.default)(user_const_1.UserRole.admin, user_const_1.UserRole.faculty, user_const_1.UserRole.student), (0, zod_validaction_1.default)(Auth_validaction_1.authValidaction.changePassowrdValidaction), Auth_Controllers_1.authController.chengePassword);
router.post('/refresh-token', (0, zod_validaction_1.default)(Auth_validaction_1.authValidaction.refreshTokenValidationSchema), Auth_Controllers_1.authController.refreshToken);
exports.AuthRoutes = router;
