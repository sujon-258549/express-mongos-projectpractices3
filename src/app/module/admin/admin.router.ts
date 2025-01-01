import { Router } from 'express';
import { adminController } from './admin.collection';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

const router = Router();
router.get('/', auth(UserRole.supperAdmin), adminController.findAllAdmin);
router.delete(
  '/:id',
  auth(UserRole.supperAdmin),
  adminController.deleteAllAdmin,
);

export const adminRouter = router;
