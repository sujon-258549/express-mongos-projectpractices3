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
exports.acadimicDepertmentServises = void 0;
const acadimic_Depertment_model_1 = require("./acadimic.Depertment.model");
const createFaculty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield acadimic_Depertment_model_1.AcadimicDepertmentModel.create(payload);
    return result;
});
const findAllFaculty = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield acadimic_Depertment_model_1.AcadimicDepertmentModel.find().populate('acadimicFaculty');
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const findoneFaculty = (facultyId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(facultyId);
    const result = yield acadimic_Depertment_model_1.AcadimicDepertmentModel.findById(facultyId).populate('acadimicFaculty');
    return result;
});
const deleteoneFaculty = (facultyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield acadimic_Depertment_model_1.AcadimicDepertmentModel.findByIdAndDelete(facultyId, {
            isDeleted: true,
        });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const updateOneFacultyData = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    // Use lowercase 'string' for consistency
    const result = yield acadimic_Depertment_model_1.AcadimicDepertmentModel.findByIdAndUpdate(id, updateData, { new: true }); // Convert string _id to ObjectId
    return result;
});
exports.acadimicDepertmentServises = {
    createFaculty,
    findAllFaculty,
    findoneFaculty,
    deleteoneFaculty,
    updateOneFacultyData,
};
