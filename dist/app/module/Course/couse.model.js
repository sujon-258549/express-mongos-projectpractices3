"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyModel = exports.CourseModel = void 0;
const mongoose_1 = require("mongoose");
// Sub-schema for PreRequisiteCourse
const PreRequisiteCourseSchema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course', // Reference to the course collection
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
// Main schema for Course
const CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    prifix: {
        type: String,
        required: [true, 'Prefix is required'],
        trim: true,
    },
    cod: {
        type: Number,
        required: [true, 'Code is required'],
        min: [1, 'Code must be a positive number'],
    },
    credits: {
        type: Number,
        required: [true, 'Credits are required'],
        min: [0, 'Credits cannot be negative'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    preRepusiteCousere: {
        type: [PreRequisiteCourseSchema],
        default: [],
    },
}, {
    timestamps: true,
});
CourseSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
CourseSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
// Export the model
exports.CourseModel = (0, mongoose_1.model)('Course', CourseSchema);
// course facultis
const courseFacultySchema = new mongoose_1.Schema({
    corses: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        unique: true,
    },
    facultys: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Faculty',
        },
    ],
});
exports.FacultyModel = (0, mongoose_1.model)('Faculty', courseFacultySchema);
