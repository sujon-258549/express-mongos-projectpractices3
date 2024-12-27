"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acadimicFaculty_router_1 = require("../module/acadimicFaculty/acadimicFaculty.router");
const express_1 = require("express");
const student_router_1 = require("../module/student/student.router");
const user_router_1 = require("../module/user/user.router");
const acc_route_1 = require("../module/acedimicsamicter/acc.route");
const acadimic_Depertment_router_1 = require("../module/acadimicDipartment/acadimic.Depertment.router");
const admin_router_1 = require("../module/admin/admin.router");
const course_router_1 = require("../module/Course/course.router");
const smesterRagistaction_router_1 = require("../module/samesterRagistactoin/smesterRagistaction.router");
const OfferedCourse_router_1 = require("../module/OfferedCourse/OfferedCourse.router");
const Auth_router_1 = require("../module/Auth/Auth.router");
const router = (0, express_1.Router)();
const allRouter = [
    {
        path: '/student',
        router: student_router_1.studentRouter,
    },
    {
        path: '/users',
        router: user_router_1.userRouter,
    },
    {
        path: '/acadimic-samester',
        router: acc_route_1.acedimicSemister,
    },
    {
        path: '/faculty',
        router: acadimicFaculty_router_1.acadimicFucaltyRouter,
    },
    {
        path: '/depertment',
        router: acadimic_Depertment_router_1.acadimicDepertmentRouter,
    },
    {
        path: '/admin',
        router: admin_router_1.adminRouter,
    },
    {
        path: '/course',
        router: course_router_1.courseRouter,
    },
    {
        path: '/ragistaction',
        router: smesterRagistaction_router_1.semesterRegistrationRoutes,
    },
    {
        path: '/offerd-course',
        router: OfferedCourse_router_1.offeredCourseRoutes,
    },
    {
        path: '/auth',
        router: Auth_router_1.AuthRoutes,
    },
];
allRouter.forEach((route) => router.use(route.path, route.router));
exports.default = router;
