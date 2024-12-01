import { NextFunction, Request, Response, Router } from 'express';
import { userContoller } from './user.contrllers';
import { studentValidationSchemaforzod } from '../student/zod.validaction';
import { AnyZodObject } from 'zod';

const router = Router();

const studentValidaction = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  '/create-student',
  studentValidaction(studentValidationSchemaforzod),
  userContoller.creatUser,
);

export const userRouter = router;
