import { Router } from 'express';
import { accadimicSamesterController } from './acadimic.controllers';
import studentValidaction from '../utility/zod.validaction';
import { AcademicSemesterZod } from './acedimic.zod.validaction';

const router = Router();

router.use(
  '/create-samester-for-student',
  studentValidaction(AcademicSemesterZod.AcademicSemesterSchema),
  accadimicSamesterController.createAcadimicSamester,
);

export const acedimicSemister = router;
