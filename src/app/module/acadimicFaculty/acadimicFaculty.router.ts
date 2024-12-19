import { Router } from 'express';
import { facultyContruller } from './acadimicfaculty.controllers';
import auth from '../utility/auth';

const router = Router();

router.get('/', auth(), facultyContruller.findAllFaculty);
router.get('/:facultyId', facultyContruller.findSingleFaculty);
router.delete('/:facultyId', facultyContruller.deleteSingleFaculty);

export const acadimicFucaltyRouter = router;
