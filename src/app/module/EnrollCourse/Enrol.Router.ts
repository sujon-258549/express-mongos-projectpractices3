import express from 'express';
import auth from '../utility/auth';
import zodValidaction from '../utility/zod.validaction';
const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  zodValidaction(),
  // EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  //   EnrolledCourseControllers.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  zodValidaction(),
  // EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
