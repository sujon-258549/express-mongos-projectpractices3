import { Router } from 'express';
import zodValidaction from '../utility/zod.validaction';
import { courseController } from './course.collection';
import { courseZodValidaction } from './couser.validaction.forZod';

const router = Router();

router.post(
  '/create-course',

  zodValidaction(courseZodValidaction.createCourseValidaction),

  courseController.createCourse,
);
router.patch(
  '/:id',

  zodValidaction(courseZodValidaction.updataValidactionforCourse),

  courseController.updateCourse,
);

router.get('/', courseController.findallCourse);
router.get('/:id', courseController.singleFindCourse);
router.delete('/:id', courseController.deleteCourse);
// router.get('/', courseController.findallCourse)

export const courseRouter = router;
