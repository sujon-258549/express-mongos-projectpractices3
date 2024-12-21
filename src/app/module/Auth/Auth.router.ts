import express from 'express';
import zodValidaction from '../utility/zod.validaction';
import { authValidaction } from './Auth.validaction';
import { authController } from './Auth.Controllers';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

const router = express.Router();

router.post(
  '/login',
  zodValidaction(authValidaction.createLoginUserValidaction),
  authController.loginUser,
);
router.post(
  '/change-password',
  auth(UserRole.admin, UserRole.faculty, UserRole.student),
  zodValidaction(authValidaction.changePassowrdValidaction),
  authController.chengePassword,
);

export const AuthRoutes = router;
