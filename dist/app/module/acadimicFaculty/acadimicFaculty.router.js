"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acadimicFucaltyRouter = void 0;
const express_1 = require("express");
const acadimicfaculty_controllers_1 = require("./acadimicfaculty.controllers");
const auth_1 = __importDefault(require("../utility/auth"));
const user_const_1 = require("../user/user.const");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(user_const_1.UserRole.admin), acadimicfaculty_controllers_1.facultyContruller.findAllFaculty);
router.get('/:facultyId', acadimicfaculty_controllers_1.facultyContruller.findSingleFaculty);
router.delete('/:facultyId', acadimicfaculty_controllers_1.facultyContruller.deleteSingleFaculty);
exports.acadimicFucaltyRouter = router;
