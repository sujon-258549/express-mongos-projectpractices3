import { Router } from 'express';
import { accadimicSamesterController } from './acadimic.controllers';
import zodValidaction from '../utility/zod.validaction';
import { AcademicSemesterZod } from './acedimic.zod.validaction';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

const router = Router();

router.post(
  '/create-samester-for-student',
  auth(UserRole.supperAdmin, UserRole.admin),
  zodValidaction(AcademicSemesterZod.AcademicSemesterSchema),
  accadimicSamesterController.createAcadimicSamester,
);

router.get(
  '/',
  auth(
    UserRole.supperAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),
  accadimicSamesterController.findallAcadimicSamester,
);
router.get('/:_id', accadimicSamesterController.findSpicifySamester);
export const acedimicSemister = router;
