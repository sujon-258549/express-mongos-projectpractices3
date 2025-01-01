import { Router } from 'express';
import zodValidaction from '../utility/zod.validaction';
import { courseController } from './course.collection';
import { courseZodValidaction } from './couser.validaction.forZod';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

const router = Router();

router.post(
  '/create-course',
  auth(UserRole.supperAdmin, UserRole.admin),
  zodValidaction(courseZodValidaction.createCourseValidaction),

  courseController.createCourse,
);
router.patch(
  '/:id',
  auth(UserRole.supperAdmin, UserRole.admin),
  zodValidaction(courseZodValidaction.updataValidactionforCourse),

  courseController.updateCourse,
);

router.get(
  '/',
  auth(
    UserRole.supperAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),
  courseController.findallCourse,
);
router.get(
  '/:id',
  auth(
    UserRole.supperAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),

  courseController.singleFindCourse,
);
router.delete(
  '/:id',
  auth(UserRole.supperAdmin, UserRole.admin),
  courseController.deleteCourse,
);
router.put(
  '/:courseId/assign-facultys',
  auth(UserRole.supperAdmin, UserRole.admin),
  courseController.addtoFacultyCourse,
);
router.delete(
  '/:courseId/assign-facultys',
  auth(UserRole.supperAdmin, UserRole.admin),
  courseController.removeFacultyCourse,
);

router.get(
  '/:courseId/get-facultys',
  auth(
    UserRole.supperAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),

  courseController.getFacultiesWithCourse,
);

export const courseRouter = router;
