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
exports.acadimicSamesterServises = void 0;
const acedimic_mode_1 = require("./acedimic.mode");
const createAcedimic = (payloade) => __awaiter(void 0, void 0, void 0, function* () {
    const acadimicSamestermaper = {
        Autom: '01',
        Summer: '02',
        Fall: '03',
    };
    //   top solition 1one line cod
    // const acadimicSamestermaper: Record<string, string> = {
    //     Autom: '01',
    //     Summer: '02',
    //     Fall: '03',
    //   };
    if (acadimicSamestermaper[payloade.name] !== payloade.code) {
        throw new Error('The semester name and code do not match.');
    }
    const result = yield acedimic_mode_1.AcademicSamesterModel.create(payloade);
    return result;
});
const findAllsamester = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield acedimic_mode_1.AcademicSamesterModel.find();
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const findSpisifysamester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield acedimic_mode_1.AcademicSamesterModel.findById(id);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.acadimicSamesterServises = {
    createAcedimic,
    findAllsamester,
    findSpisifysamester,
};
