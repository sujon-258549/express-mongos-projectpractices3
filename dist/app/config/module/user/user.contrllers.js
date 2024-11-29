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
exports.userContoller = void 0;
const user_servises_1 = require("./user.servises");
const creatUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, student } = req.body;
        // zod validaction data
        // const zodValidactionPart = studentValidationSchemaforzod.parse(data);
        // Call service to create a student
        const result = yield user_servises_1.userServises.createUserServerDB(password, student);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userContoller = {
    creatUser,
};
