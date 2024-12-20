import { Router } from 'express';
import { userContoller } from './user.contrllers';
import { studentValidationSchemaforzod } from '../student/zod.validaction';
import zodValidaction from '../utility/zod.validaction';
import { facultyZodValidactionSchema } from '../acadimicFaculty/acadimic.faculty.validaction.zod';
import { adminValidationSchema } from '../admin/admin.zod.validaction';
import auth from '../utility/auth';
import { UserRole } from './user.const';

const router = Router();

router.post(
  '/create-student',
  auth(UserRole.admin),
  zodValidaction(studentValidationSchemaforzod),
  userContoller.creatUser,
);
router.post(
  '/create-faculty',
  zodValidaction(facultyZodValidactionSchema),
  userContoller.createFaculty,
);
router.post(
  '/create-admin',
  zodValidaction(adminValidationSchema),
  userContoller.createAdmin,
);

export const userRouter = router;
