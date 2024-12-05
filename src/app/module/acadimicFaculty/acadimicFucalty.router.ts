import { Router } from 'express';
import { fucaltyContruller } from './acadimicfucalty.controllers';

const router = Router();

router.post('/create-fucalty', fucaltyContruller.createFucalty);
router.get('/', fucaltyContruller.findAllFucalty);
router.get('/one-fucalty', fucaltyContruller.findSingleFucalty);
router.delete('/delete-fucalty', fucaltyContruller.deleteSingleFucalty);

export const acadimicFucaltyRouter = router;
