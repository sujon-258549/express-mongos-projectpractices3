import express from 'express';
import { studentController } from './student.controlle';
import zodValidaction from '../utility/zod.validaction';
import { studentvalidaction } from './zod.validaction';

const router = express.Router();

router.get('/', studentController.findStudent);
router.delete('/:studentId', studentController.studentOneDeleted);
router.get('/:studentId', studentController.studentOnefind);
router.put(
  '/:studentId',
  zodValidaction(studentvalidaction.updateStudentValidationSchemaforzod),
  studentController.updateStudentOnefind,
);

export const studentRouter = router;
