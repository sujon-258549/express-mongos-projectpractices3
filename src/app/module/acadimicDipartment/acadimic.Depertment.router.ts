import { Router } from 'express';
import { acadimicDepertmentContruller } from './acadimic.Depertment.controllers';

const router = Router();

router.post('/create-depertmet', acadimicDepertmentContruller.createDepertment);
router.get('/', acadimicDepertmentContruller.findAllFaculty);
router.get('/:depertmentId', acadimicDepertmentContruller.findSingleFaculty);
router.delete(
  '/:depertmentId',
  acadimicDepertmentContruller.deleteSingleFaculty,
);
router.patch(
  '/:depertmentId',
  acadimicDepertmentContruller.updateSingleDepertment,
);

export const acadimicDepertmentRouter = router;
