import { Router } from 'express';
import { adminController } from './admin.collection';

const router = Router();
router.get('/', adminController.findAllAdmin);
router.delete('/:id', adminController.deleteAllAdmin);

export const adminRouter = router;
