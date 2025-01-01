import express from 'express';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';
import zodValidaction from '../utility/zod.validaction';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controllers';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(UserRole.supperAdmin, UserRole.admin),
  zodValidaction(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get(
  '/:id',
  auth(
    UserRole.supperAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  '/:id',
  auth(UserRole.supperAdmin, UserRole.admin),
  zodValidaction(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

router.get(
  '/',
  auth(
    UserRole.supperAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),
  AcademicFacultyControllers.getAllAcademicFaculties,
);

export const AcademicFacultyRoutes = router;
