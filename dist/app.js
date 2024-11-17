"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const student_router_1 = require("./app/config/module/student/student.router");
// const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/student', student_router_1.studentRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
