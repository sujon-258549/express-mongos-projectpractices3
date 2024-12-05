import { Router } from 'express';
import { fucaltyContruller } from './acadimicfucalty.controllers';

const router = Router();

router.post('/create-fucalty', fucaltyContruller.createFucalty);

export const acadimicFucaltyRouter = router;
