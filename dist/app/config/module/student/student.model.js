"use strict";
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
            //   validator: function (value) {
            //     const formattedValue =
            //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            //     return formattedValue === value;
            //   },
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
        // validate: {
        //   validator: (value: string) => validator.isAlpha(value),
        //   message: '{VALUE} is not define',
        // },
    },
});
const StudentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, 'Student ID is required.'],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Student password is required.'],
        unique: true,
        ref: 'User',
    },
    name: {
        type: NameSchema,
        required: [true, 'Name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        //   validate: {
        //     validator: (value: string) => validator.isEmail(value),
        //     message: '{VALUE} is not email formet',
        //   },
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
    isDeleted: {
        type: Boolean,
        default: false,
    },
    comments: {
        type: String,
        required: [false, 'Comments are not required.'],
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
// vartuale
StudentSchema.virtual('fullname').get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});
// // user existis for mongos static function
// StudentSchema.statics.isStudentExists = async function (id: string) {
//   const extStudent = await Student.findOne({ id });
//   return extStudent;
// };
// StudentSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// StudentSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// StudentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });
// StudentSchema.statics.isStudentExists = async function (id: string) {
//   return this.findOne({ id });
// };
// export const StudentIdValidactionModel = model<
//   Student,
//   StudentModelValidactionId
// >('Student', StudentSchema);
exports.Student = (0, mongoose_1.model)('Student', StudentSchema);
