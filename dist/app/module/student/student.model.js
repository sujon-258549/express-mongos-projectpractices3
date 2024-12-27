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
exports.Student = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
// import { boolean } from 'joi';
// import validator from 'validator';
const GuardianSchema = new mongoose_1.Schema({
    guardianName: {
        type: String,
        required: [false, 'Guardian name is required.'],
    },
    guardianPhone: {
        type: String,
        required: [false, 'Guardian phone number is required.'],
    },
});
const NameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required.'],
        validation: {
            message: '{VALUE} is not in a capitalized format.',
        },
    },
    middleName: {
        type: String,
        required: [false, 'Middle name is required.'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
    },
});
const StudentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' collection
    },
    id: {
        type: String,
    },
    name: {
        type: NameSchema,
        required: [true, 'Name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
    },
    avatar: {
        type: String,
        required: [false, 'Avatar is required.'],
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required.'],
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Other'], //enum use arry
            message: '{VALUE} is not a valid gender.',
        },
        required: [true, 'Gender is required.'],
    },
    phone: {
        type: String,
        required: [false, 'Phone number is required.'],
        maxlength: [11, 'Phone number cannot exceed 11 characters.'],
    },
    address: {
        type: String,
        required: [false, 'Address is required.'],
    },
    grade: {
        type: String,
        required: [true, 'Grade is required.'],
    },
    section: {
        type: String,
        required: [false, 'Section is required.'],
    },
    enrolledDate: {
        type: String,
        required: [true, 'Enrollment date is required.'],
    },
    guardian: {
        type: GuardianSchema,
        required: [true, 'Guardian details are required.'],
    },
    nationality: {
        type: String,
        required: [false, 'Nationality is required.'],
    },
    religion: {
        type: String,
        required: [true, 'Religion is required.'],
    },
    hobbies: {
        type: [String],
        required: [false, 'Hobbies are required.'],
    },
    extracurriculars: {
        type: [String],
        required: [false, 'Extracurricular activities are required.'],
    },
    previousSchool: {
        type: String,
        required: [false, 'Previous school is required.'],
    },
    emergencyContact: {
        type: String,
        required: [false, 'Emergency contact is required.'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group.',
        },
        required: [false, 'Blood group is not required.'],
    },
    attendancePercentage: {
        type: Number,
        required: [false, 'Attendance percentage is not required.'],
    },
    marks: {
        type: Map,
        of: Number,
        required: [false, 'Marks are not required.'],
    },
    admitionSamester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'academic',
    },
    acadimicDepertment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Acadimicdepertment',
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    comments: {
        type: String,
        required: [false, 'Comments are not required.'],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});
// vartuale
StudentSchema.virtual('fullname').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// user existis for mongos static function
StudentSchema.statics.isStudentExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const extStudent = yield exports.Student.findOne({ id });
        return extStudent;
    });
};
StudentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
StudentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
StudentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
StudentSchema.statics.isStudentExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ id });
    });
};
//
exports.Student = (0, mongoose_1.model)('Student', StudentSchema);
