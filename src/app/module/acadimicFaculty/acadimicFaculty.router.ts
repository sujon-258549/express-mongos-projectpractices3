import { Router } from 'express';
import { facultyContruller } from './acadimicfaculty.controllers';

const router = Router();

router.get('/', facultyContruller.findAllFaculty);
router.get('/:facultyId', facultyContruller.findSingleFaculty);
router.delete('/:facultyId', facultyContruller.deleteSingleFaculty);

export const acadimicFucaltyRouter = router;
