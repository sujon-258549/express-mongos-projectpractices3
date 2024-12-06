import { Router } from 'express';
import { userContoller } from './user.contrllers';
import { studentValidationSchemaforzod } from '../student/zod.validaction';
import zodValidaction from '../utility/zod.validaction';

const router = Router();

router.post(
  '/create-student',
  zodValidaction(studentValidationSchemaforzod),
  userContoller.creatUser,
);

export const userRouter = router;
