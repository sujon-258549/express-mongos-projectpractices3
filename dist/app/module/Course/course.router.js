"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = require("express");
const zod_validaction_1 = __importDefault(require("../utility/zod.validaction"));
const course_collection_1 = require("./course.collection");
const couser_validaction_forZod_1 = require("./couser.validaction.forZod");
const router = (0, express_1.Router)();
router.post('/create-course', (0, zod_validaction_1.default)(couser_validaction_forZod_1.courseZodValidaction.createCourseValidaction), course_collection_1.courseController.createCourse);
router.patch('/:id', (0, zod_validaction_1.default)(couser_validaction_forZod_1.courseZodValidaction.updataValidactionforCourse), course_collection_1.courseController.updateCourse);
router.get('/', course_collection_1.courseController.findallCourse);
router.get('/:id', course_collection_1.courseController.singleFindCourse);
router.delete('/:id', course_collection_1.courseController.deleteCourse);
router.put('/:courseId/assign-facultys', course_collection_1.courseController.addtoFacultyCourse);
router.delete('/:courseId/assign-facultys', course_collection_1.courseController.removeFacultyCourse);
exports.courseRouter = router;
