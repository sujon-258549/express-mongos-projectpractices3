import { Router } from 'express';
import { facultyContruller } from './Faculty.controllers';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

const router = Router();

router.get(
  '/',
  auth(UserRole.admin, UserRole.supperAdmin),
  facultyContruller.findAllFaculty,
);
router.get(
  '/:facultyId',
  auth(UserRole.admin, UserRole.supperAdmin, UserRole.faculty),
  facultyContruller.findSingleFaculty,
);
router.delete(
  '/:facultyId',
  auth(UserRole.admin, UserRole.supperAdmin),
  facultyContruller.deleteSingleFaculty,
);

export const fucaltyRouter = router;
