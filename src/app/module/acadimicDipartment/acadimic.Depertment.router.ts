import { Router } from 'express';
import { acadimicDepertmentContruller } from './acadimic.Depertment.controllers';
import zodValidaction from '../utility/zod.validaction';
import { acadimicDepertment } from './acadimicDepertment.validaction';

const router = Router();

router.post(
  '/create-depertment',

  zodValidaction(acadimicDepertment.createAcadimicDepentmetnValidactionZod),

  acadimicDepertmentContruller.createDepertment,
);
router.get('/', acadimicDepertmentContruller.findAllFaculty);
router.get('/:depertmentId', acadimicDepertmentContruller.findSingleFaculty);
router.delete(
  '/:depertmentId',
  acadimicDepertmentContruller.deleteSingleFaculty,
);
router.patch(
  '/:depertmentId',
  zodValidaction(acadimicDepertment.updateAcadimicDepentmetnValidactionZod),
  acadimicDepertmentContruller.updateSingleDepertment,
);

export const acadimicDepertmentRouter = router;
