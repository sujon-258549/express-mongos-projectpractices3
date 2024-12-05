import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { fucaltyServises } from './acadimic.fucalty.servises';

const createFucalty = catchAsynch(async (req, res) => {
  const result = await fucaltyServises.createFucalty(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Fucalty Created Successfuly',
    data: result,
  });
});

export const fucultyContruller = {
  createFucalty,
};
