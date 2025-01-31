import express from 'express';
import auth from '../utility/auth';
import zodValidaction from '../utility/zod.validaction';
import { EnrolledCourseValidations } from './EnrllCourse.validaction';
import { EnrolledCourseControllers } from './Enroll.controllers';
import { UserRole } from '../user/user.const';
const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  zodValidaction(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createOfferedCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(UserRole.faculty),
  zodValidaction(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  // EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  EnrolledCourseControllers.updateEnrollCoutse,
);

export const EnrolledCourseRoutes = router;
