import { Router } from 'express';
import { facultyContruller } from './acadimicfaculty.controllers';

const router = Router();

router.post('/create-faculty', facultyContruller.createFucalty);
router.get('/', facultyContruller.findAllFucalty);
router.get('/:facultyId', facultyContruller.findSingleFucalty);
router.delete('/:facultyId', facultyContruller.deleteSingleFucalty);

export const acadimicFucaltyRouter = router;
