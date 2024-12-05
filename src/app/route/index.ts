import { acadimicFucaltyRouter } from './../module/acadimicFaculty/acadimicFucalty.router';
import { Router } from 'express';
import { studentRouter } from '../module/student/student.router';
import { userRouter } from '../module/user/user.router';
import { acedimicSemister } from '../module/acedimicsamicter/acc.route';

const router = Router();

const allRouter = [
  {
    path: '/student',
    router: studentRouter,
  },
  {
    path: '/users',
    router: userRouter,
  },
  {
    path: '/acadimic-samester',
    router: acedimicSemister,
  },
  {
    path: '/fucalty',
    router: acadimicFucaltyRouter,
  },
];

allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
