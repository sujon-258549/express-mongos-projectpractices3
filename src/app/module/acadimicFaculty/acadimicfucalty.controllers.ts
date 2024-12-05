import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { fucaltyServises } from './acadimic.fucalty.servises';
import httpStatus from 'http-status';

const createFucalty = catchAsynch(async (req, res) => {
  const result = await fucaltyServises.createFucalty(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Fucalty Created Successfuly',
    data: result,
  });
});

const findAllFucalty = catchAsynch(async (req, res) => {
  const result = await fucaltyServises.findAllFucalty();
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Fucalty All find Successfuly',
    data: result,
  });
});

const findSingleFucalty = catchAsynch(async (req, res) => {
  const { fucaltyId } = req.params;
  const result = await fucaltyServises.findoneFucalty(fucaltyId);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Fucalty Created Successfuly',
    data: result,
  });
});
const deleteSingleFucalty = catchAsynch(async (req, res) => {
  const { fucaltyId } = req.params;
  const result = await fucaltyServises.deleteoneFucalty(fucaltyId);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Fucalty Created Successfuly',
    data: result,
  });
});

export const fucaltyContruller = {
  createFucalty,
  findAllFucalty,
  findSingleFucalty,
  deleteSingleFucalty,
};
