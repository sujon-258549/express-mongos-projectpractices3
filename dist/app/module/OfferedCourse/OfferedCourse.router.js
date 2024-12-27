"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offeredCourseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const zod_validaction_1 = __importDefault(require("../utility/zod.validaction"));
const OfferedCourse_validation_1 = require("./OfferedCourse.validation");
const OfferedCourse_controllers_1 = require("./OfferedCourse.controllers");
const router = express_1.default.Router();
// router.get('/', OfferedCourseControllers.getAllOfferedCourses);
// router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);
router.post('/create-offered-course', (0, zod_validaction_1.default)(OfferedCourse_validation_1.OfferedCourseValidations.createOfferedCourseValidationSchema), OfferedCourse_controllers_1.OfferedCourseControllers.createOfferedCourse);
router.patch('/:id', (0, zod_validaction_1.default)(OfferedCourse_validation_1.OfferedCourseValidations.updateOfferedCourseValidationSchema), OfferedCourse_controllers_1.OfferedCourseControllers.updateOfferedCourseIntoDB);
// router.delete(
//   '/:id',
//   OfferedCourseControllers.deleteOfferedCourseFromDB,
// );
exports.offeredCourseRoutes = router;
