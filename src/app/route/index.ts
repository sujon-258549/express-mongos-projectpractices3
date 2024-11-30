import { Router } from 'express';
import { studentRouter } from '../module/student/student.router';
import { userRouter } from '../module/user/user.router';

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
];

allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
