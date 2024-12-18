import express from 'express';
import zodValidaction from '../utility/zod.validaction';
import { authValidaction } from './Auth.validaction';
import { authController } from './Auth.Controllers';

const router = express.Router();

router.post(
  '/login',
  zodValidaction(authValidaction.createLoginUserValidaction),
  authController.loginUser,
);

export const AuthRoutes = router;
