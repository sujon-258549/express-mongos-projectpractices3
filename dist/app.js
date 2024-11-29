"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const student_router_1 = require("./app/config/module/student/student.router");
const user_router_1 = require("./app/config/module/user/user.router");
// const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/student', student_router_1.studentRouter);
app.use('/api/v1/users', user_router_1.userRouter);
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    const statusCode = 500;
    const message = error.message || 'Something went wrong.';
    res.status(statusCode).json({
        success: false,
        message: message,
        error: error,
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
