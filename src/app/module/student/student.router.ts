import express from 'express';
import { studentController } from './student.controlle';
import zodValidaction from '../utility/zod.validaction';
import { studentvalidaction } from './zod.validaction';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

const router = express.Router();

router.get('/', studentController.findStudent);
router.delete('/:studentId', studentController.studentOneDeleted);
router.get(
  '/:studentId',
  auth(UserRole.admin, UserRole.faculty, UserRole.student),
  studentController.studentOnefind,
);

router.put(
  '/:studentId',
  zodValidaction(studentvalidaction.updateStudentValidationSchemaforzod),
  studentController.updateStudentOnefind,
);

export const studentRouter = router;
