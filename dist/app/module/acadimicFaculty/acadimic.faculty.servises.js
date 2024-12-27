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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyServises = void 0;
// import { generateFacultyId } from './utilits';
// import { TFaculty } from './acadimic.Faculty.interfaces';
const acadimic_Faculty_model_1 = require("./acadimic.Faculty.model");
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const FacultySearchableFields = [
    'email',
    'id',
    'contactNo',
    'emergencyContactNo',
    'name.firstName',
    'name.lastName',
    'name.middleName',
];
// const createFaculty = async (payload: TFaculty) => {
//   try {
//     const facultyId = await generateFacultyId();
//     const facultyData = {
//       ...payload,
//       id: facultyId, // Ensure the new ID is included
//     };
//     const result = await AcadimicFacultyModel.create(facultyData);
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const findAllFaculty = async () => {
//   try {
//     const result = await AcadimicFacultyModel.find();
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };
const findAllFaculty = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyQuery = new queryBuilder_1.default(acadimic_Faculty_model_1.AcadimicFucaltyModel.find().populate('academicDepartment'), query)
        .search(FacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield facultyQuery.modelQuery;
    return result;
});
const findoneFaculty = (facultyId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(facultyId);
    try {
        const result = yield acadimic_Faculty_model_1.AcadimicFucaltyModel.findById(facultyId);
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
const deleteoneFaculty = (facultyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield acadimic_Faculty_model_1.AcadimicFucaltyModel.findByIdAndDelete(facultyId, {
            isDeleted: true,
        });
        return result;
    }
    catch (error) {
        console.log(error);
    }
});
exports.facultyServises = {
    //   createFaculty,
    findAllFaculty,
    findoneFaculty,
    deleteoneFaculty,
};
