import express from 'express';
import zodValidaction from '../utility/zod.validaction';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controllers';

const router = express.Router();

// router.get('/', OfferedCourseControllers.getAllOfferedCourses);

// router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  zodValidaction(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

router.patch(
  '/:id',
  zodValidaction(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourseIntoDB,
);

// router.delete(
//   '/:id',
//   OfferedCourseControllers.deleteOfferedCourseFromDB,
// );

export const offeredCourseRoutes = router;
