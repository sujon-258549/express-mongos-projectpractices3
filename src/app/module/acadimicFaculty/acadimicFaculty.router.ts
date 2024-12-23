import { Router } from 'express';
import { facultyContruller } from './acadimicfaculty.controllers';
import auth from '../utility/auth';
import { UserRole } from '../user/user.const';

const router = Router();

router.get('/', auth(UserRole.admin), facultyContruller.findAllFaculty);
router.get('/:facultyId', facultyContruller.findSingleFaculty);
router.delete('/:facultyId', facultyContruller.deleteSingleFaculty);

export const acadimicFucaltyRouter = router;
