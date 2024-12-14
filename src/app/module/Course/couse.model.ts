import { Schema, model, Types } from 'mongoose';
import { Tcourses } from './course.interfaces';

// Sub-schema for PreRequisiteCourse
const PreRequisiteCourseSchema = new Schema({
  course: {
    type: Types.ObjectId,
    ref: 'Course', // Reference to the course collection
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Main schema for Course
const CourseSchema = new Schema(
  {
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
    preRepusiteCousere: {
      type: [PreRequisiteCourseSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Export the model
export const CourseModel = model<Tcourses>('Course', CourseSchema);
