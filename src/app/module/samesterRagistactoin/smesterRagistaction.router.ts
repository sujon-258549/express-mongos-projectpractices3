import express from 'express';
import { SemesterRegistrationController } from './smesterRagistaction.controllers';
import zodValidaction from '../utility/zod.validaction';
import { SemesterRegistrationValidations } from './samesterRagistaction.zodValidaction';

const router = express.Router();

router.post(
  '/create-semester-registration',
  zodValidaction(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createRagistaction,
);

router.get('/', SemesterRegistrationController.findAllRagistaction);

// router.patch(
//   '/:id',
//   validateRequest(
//     SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
//   ),
//   SemesterRegistrationController.updateSemesterRegistration,
// );

router.get('/:id', SemesterRegistrationController.findoneRagistaction);

// router.delete(
//   '/:id',
//   SemesterRegistrationController.deleteSemesterRegistration,
// );

// router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
