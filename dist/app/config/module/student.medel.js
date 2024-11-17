"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const nameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    },
});
const gurdientSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNumber: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNumber: { type: String, required: true },
});
const LocalGardientSchema = new mongoose_1.Schema({
    name: { type: String, required: true }, // Corrected the field structure
    ocupation: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String }, // Optional field, so `required` is omitted
});
const StudentSchema = new mongoose_1.Schema({
    id: { type: Number },
    name: { nameSchema },
    gender: ['male', 'female', 'other'],
    dateOfBirth: { type: String },
    contactNumber: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: gurdientSchema,
    email: { type: String, required: true },
    avatar: { type: String },
    localgardient: LocalGardientSchema,
    photourl: { type: String },
    isActive: { type: Boolean },
});
exports.StudentModel = (0, mongoose_1.model)('Student', StudentSchema);
