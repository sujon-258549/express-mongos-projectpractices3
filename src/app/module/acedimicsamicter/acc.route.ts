import { Router } from 'express';
import { accadimicSamesterController } from './acadimic.controllers';
import studentValidaction from '../utility/zod.validaction';
import { AcademicSemesterZod } from './acedimic.zod.validaction';

const router = Router();

router.post(
  '/create-samester-for-student',
  studentValidaction(AcademicSemesterZod.AcademicSemesterSchema),
  accadimicSamesterController.createAcadimicSamester,
);

router.get('/', accadimicSamesterController.findallAcadimicSamester);
router.get('/:_id', accadimicSamesterController.findSpicifySamester);
export const acedimicSemister = router;
