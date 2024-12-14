import { Router } from 'express';
import zodValidaction from '../utility/zod.validaction';
import { courseController } from './course.collection';
import { courseZodValidaction } from './couser.validaction.forZod';

const router = Router();

router.post(
  '/create-course',

  zodValidaction(courseZodValidaction.CourseSchemaValidactionZod),

  courseController.createCourse,
);

export const courseRouter = router;
