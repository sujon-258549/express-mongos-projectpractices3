import express from 'express';
import zodValidaction from '../utility/zod.validaction';
import { OfferedCourseValidations } from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controllers';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

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
router.get(
  '/gert-my-offerdcourse',
  auth(UserRole.student),
  OfferedCourseControllers.myofferdCourse,
);

// router.delete(
//   '/:id',
//   OfferedCourseControllers.deleteOfferedCourseFromDB,
// );

export const offeredCourseRoutes = router;
