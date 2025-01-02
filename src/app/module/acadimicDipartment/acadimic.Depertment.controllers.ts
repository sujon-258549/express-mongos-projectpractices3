import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { acadimicDepertmentServises } from './acadimicDepertment.servises';
import httpStatus from 'http-status';

const createDepertment = catchAsynch(async (req, res) => {
  const result = await acadimicDepertmentServises.createDepertmentDB(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Depertment Created Successfuly',
    data: result,
  });
});

const findAllDepertment = catchAsynch(async (req, res) => {
  const result = await acadimicDepertmentServises.findAllDepertmentDB(
    req.query,
  );
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Depertment All Depertment Successfuly',
    meta: result.meta,
    data: result,
  });
});

const findSingleDepertment = catchAsynch(async (req, res) => {
  const { depertmentId } = req.params;
  const result =
    await acadimicDepertmentServises.findoneDepertmentDB(depertmentId);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Single Depertment find Successfuly',
    data: result,
  });
});
const deleteSingledepertment = catchAsynch(async (req, res) => {
  const { depertmentId } = req.params;
  const result =
    await acadimicDepertmentServises.deleteoneDepertmentDB(depertmentId);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Depertment deleted Successfuly',
    data: result,
  });
});
const updateSingleDepertment = catchAsynch(async (req, res) => {
  const { depertmentId } = req.params;
  const updateData = req.body;
  const result = await acadimicDepertmentServises.updateOneDepertmentDataintoDB(
    depertmentId,
    updateData,
  );
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Depertment Updated Successfuly',
    data: result,
  });
});

export const acadimicDepertmentContruller = {
  createDepertment,
  findAllDepertment,
  findSingleDepertment,
  deleteSingledepertment,
  updateSingleDepertment,
};
