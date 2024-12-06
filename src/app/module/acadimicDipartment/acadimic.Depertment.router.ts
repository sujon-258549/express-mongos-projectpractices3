import { Router } from 'express';
import { acadimicDepertmentContruller } from './acadimic.Depertment.controllers';

const router = Router();

router.post('/create-depertmet', acadimicDepertmentContruller.createFucalty);
router.get('/', acadimicDepertmentContruller.findAllFaculty);
router.get('/:facultyId', acadimicDepertmentContruller.findSingleFaculty);
router.delete('/:facultyId', acadimicDepertmentContruller.deleteSingleFaculty);

export const acadimicDepertmentRouter = router;
