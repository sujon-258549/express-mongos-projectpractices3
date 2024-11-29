"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_contrllers_1 = require("./user.contrllers");
const router = (0, express_1.Router)();
router.post('/create-student', user_contrllers_1.userContoller.creatUser);
exports.userRouter = router;
