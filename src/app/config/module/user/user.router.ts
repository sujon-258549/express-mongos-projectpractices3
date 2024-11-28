import { Router } from 'express';
import { userContoller } from './user.contrllers';

const router = Router();

router.post('/create-student', userContoller.creatUser);

export const userRouter = router;
