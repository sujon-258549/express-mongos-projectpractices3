import { Router } from 'express';
import { adminController } from './admin.collection';
import zodValidaction from '../utility/zod.validaction';
import { adiminValidaction } from './admin.zod.validaction';

const router = Router();
router.post(
  '/create-admin',

  zodValidaction(adiminValidaction.zodSchemaValidaction),
  adminController.createAdmin,
);

export const adminRouter = router;
