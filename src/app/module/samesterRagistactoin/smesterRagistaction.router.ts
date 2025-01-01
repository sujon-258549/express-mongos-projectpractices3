import express from 'express';
import { SemesterRegistrationController } from './smesterRagistaction.controllers';
import zodValidaction from '../utility/zod.validaction';
import { SemesterRegistrationValidations } from './samesterRagistaction.zodValidaction';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

const router = express.Router();

router.post(
  '/create-semester-registration',
  auth(UserRole.supperAdmin, UserRole.admin),
  zodValidaction(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createRagistaction,
);

router.get(
  '/',
  auth(
    UserRole.supperAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),
  SemesterRegistrationController.findAllRagistaction,
);

router.patch(
  '/:id',
  auth(UserRole.supperAdmin, UserRole.admin),
  zodValidaction(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateStatus,
);

router.get(
  '/:id',
  auth(
    UserRole.supperAdmin,
    UserRole.admin,
    UserRole.faculty,
    UserRole.student,
  ),
  SemesterRegistrationController.findoneRagistaction,
);

// router.delete(
//   '/:id',
//   SemesterRegistrationController.deleteSemesterRegistration,
// );

// router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
