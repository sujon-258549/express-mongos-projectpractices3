import express from 'express';
import { studentController } from './student.controlle';

const router = express.Router();

router.post('/create-student', studentController.createStudent);
router.get('/find-student', studentController.findStudent);

export const studentRouter = router;
