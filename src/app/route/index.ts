import { fucaltyRouter } from '../module/faculty/Faculty.router';
import { Router } from 'express';
import { studentRouter } from '../module/student/student.router';
import { userRouter } from '../module/user/user.router';
import { acedimicSemister } from '../module/acedimicsamicter/acc.route';
import { acadimicDepertmentRouter } from '../module/acadimicDipartment/acadimic.Depertment.router';
import { adminRouter } from '../module/admin/admin.router';
import { courseRouter } from '../module/Course/course.router';
import { semesterRegistrationRoutes } from '../module/samesterRagistactoin/smesterRagistaction.router';
import { offeredCourseRoutes } from '../module/OfferedCourse/OfferedCourse.router';
import { AuthRoutes } from '../module/Auth/Auth.router';
import { EnrolledCourseRoutes } from '../module/EnrollCourse/Enrol.Router';
import { AcademicFacultyRoutes } from '../module/Acadimic-faculty/academicFaculty.route';

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
    path: '/academic-semester',
    router: acedimicSemister,
  },
  {
    path: '/faculty',
    router: fucaltyRouter,
  },

  {
    path: '/depertment',
    router: acadimicDepertmentRouter,
  },
  {
    path: '/admin',
    router: adminRouter,
  },
  {
    path: '/course',
    router: courseRouter,
  },

  {
    path: '/ragistaction',
    router: semesterRegistrationRoutes,
  },
  {
    path: '/offerd-course',
    router: offeredCourseRoutes,
  },
  {
    path: '/academic-faculties',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/auth',
    router: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    router: EnrolledCourseRoutes,
  },
];

allRouter.forEach((route) => router.use(route.path, route.router));

export default router;
