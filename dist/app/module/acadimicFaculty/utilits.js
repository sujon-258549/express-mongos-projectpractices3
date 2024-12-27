"use strict";
// import { AcadimicFucaltyModel } from './acadimic.Faculty.model';
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
exports.generateFacultyId = void 0;
const acadimic_Faculty_model_1 = require("./acadimic.Faculty.model");
// // Function to find the last faculty ID in the database
// const findLastFaculty = async () => {
//   const lastFaculty = await AcadimicFucaltyModel.findOne()
//     .sort({ id: -1 }) // Sort by `id` in descending order
//     .lean();
//   return lastFaculty?.id ? lastFaculty.id : undefined; // Return the last ID if it exists
// };
// // Function to generate a new faculty ID
// export const generateFacultyId = async () => {
//   const lastFacultyId = await findLastFaculty(); // Get the last faculty ID
//   let newIdNumber = 1;
//   // Extract the numeric part of the last ID and increment it
//   if (lastFacultyId) {
//     const numericPart = lastFacultyId.split('-')[1]; // Assuming the ID format is `F-0001`
//     newIdNumber = Number(numericPart) + 1;
//   }
//   // Pad the new numeric ID and prefix it with `F-`
//   const newFacultyId = `F-${newIdNumber.toString().padStart(4, '0')}`;
//   return newFacultyId; // Return the newly generated ID
// };
const findLastFaculty = () => __awaiter(void 0, void 0, void 0, function* () {
    const acadimicFacultyFindId = yield acadimic_Faculty_model_1.AcadimicFucaltyModel.findOne()
        .sort({ id: -1 })
        .lean();
    return (acadimicFacultyFindId === null || acadimicFacultyFindId === void 0 ? void 0 : acadimicFacultyFindId.id) ? acadimicFacultyFindId === null || acadimicFacultyFindId === void 0 ? void 0 : acadimicFacultyFindId.id : undefined;
});
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield findLastFaculty();
    let newId = 1;
    if (id) {
        const splitId = id.split('-')[1];
        newId = Number(splitId) + 1;
    }
    const newIdCreate = `F-${newId.toString().padStart(4, '0')}`;
    return newIdCreate;
});
exports.generateFacultyId = generateFacultyId;
