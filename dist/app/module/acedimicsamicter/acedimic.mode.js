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
exports.AcademicSamesterModel = exports.acedimincModelSchema = exports.samesterCod = exports.samesterName = exports.monthNames = void 0;
const mongoose_1 = require("mongoose");
exports.monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
exports.samesterName = ['Autom', 'Summer', 'Fall'];
exports.samesterCod = ['01', '02', '03'];
exports.acedimincModelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        enum: exports.samesterName,
        required: true,
    },
    code: {
        type: String,
        enum: exports.samesterCod, // Restrict to valid codes
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    statindMonth: {
        type: String,
        enum: exports.monthNames,
    },
    endingMonth: {
        type: String,
        enum: exports.monthNames,
    },
}, {
    timestamps: true,
});
exports.acedimincModelSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkNameAndThisYear = yield exports.AcademicSamesterModel.findOne({
            year: this.year,
            name: this.name,
        });
        if (checkNameAndThisYear) {
            throw new Error('year and Samester alrady use');
        }
        next();
    });
});
exports.AcademicSamesterModel = (0, mongoose_1.model)('academic-samester', exports.acedimincModelSchema);
