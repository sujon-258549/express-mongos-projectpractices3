import express from 'express';
import { studentController } from './student.controlle';

const router = express.Router();

router.post('/create-student', studentController.createStudent);
router.get('/find-student', studentController.findStudent);
router.delete('/:studentId', studentController.studentOneDeleted);
router.get('/:studentId', studentController.studentOnefind);

export const studentRouter = router;
