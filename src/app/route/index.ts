import { acadimicFucaltyRouter as acadimicFacultyRouter } from '../module/acadimicFaculty/acadimicFaculty.router';
import { Router } from 'express';
import { studentRouter } from '../module/student/student.router';
import { userRouter } from '../module/user/user.router';
import { acedimicSemister } from '../module/acedimicsamicter/acc.route';
import { acadimicDepertmentRouter } from '../module/acadimicDipartment/acadimic.Depertment.router';

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
    path: '/faculty',
    router: acadimicFacultyRouter,
  },
  {
    path: '/depertment',
    router: acadimicDepertmentRouter,
  },
];

allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
