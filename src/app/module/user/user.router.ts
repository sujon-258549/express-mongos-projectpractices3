import { NextFunction, Request, Response, Router } from 'express';
import { userContoller } from './user.contrllers';
import { studentValidationSchemaforzod } from '../student/zod.validaction';
import zodValidaction from '../utility/zod.validaction';
import { facultyZodValidactionSchema } from '../acadimicFaculty/acadimic.faculty.validaction.zod';
import { adminValidationSchema } from '../admin/admin.zod.validaction';
import auth from '../utility/auth';
import { UserRole } from './user.const';
import { userValidactionZodSchema } from './user.validactionZod';
import { upload } from '../../utils/sendImageTogloudinari';

const router = Router();

router.post(
  '/create-student',
  auth(UserRole.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  zodValidaction(studentValidationSchemaforzod),
  userContoller.creatUser,
);
router.post(
  '/create-faculty',
  auth(UserRole.admin),
  zodValidaction(facultyZodValidactionSchema),
  userContoller.createFaculty,
);
router.post(
  '/create-admin',
  //   auth(UserRole.admin),
  zodValidaction(adminValidationSchema),
  userContoller.createAdmin,
);

router.get(
  '/me',
  auth(UserRole.admin, UserRole.faculty, UserRole.student),
  userContoller.userThisDataFind,
);
router.post(
  '/change-status/:id',
  zodValidaction(userValidactionZodSchema.UpdateUserStatus),
  auth(UserRole.admin),
  userContoller.changeUserStatus,
);

export const userRouter = router;
