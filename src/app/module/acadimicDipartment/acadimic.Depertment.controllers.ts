import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { acadimicDepertmentServises } from './acadimicDepertment.servises';
import httpStatus from 'http-status';

const createDepertment = catchAsynch(async (req, res) => {
  const result = await acadimicDepertmentServises.createFaculty(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Depertment Created Successfuly',
    data: result,
  });
});

const findAllFaculty = catchAsynch(async (req, res) => {
  const result = await acadimicDepertmentServises.findAllFaculty();
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Depertment All find Successfuly',
    data: result,
  });
});

const findSingleFaculty = catchAsynch(async (req, res) => {
  const { depertmentId } = req.params;
  const result = await acadimicDepertmentServises.findoneFaculty(depertmentId);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Depertment single find Successfuly',
    data: result,
  });
});
const deleteSingleFaculty = catchAsynch(async (req, res) => {
  const { depertmentId } = req.params;
  const result =
    await acadimicDepertmentServises.deleteoneFaculty(depertmentId);
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
  const result = await acadimicDepertmentServises.updateOneFacultyData(
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
  findAllFaculty,
  findSingleFaculty,
  deleteSingleFaculty,
  updateSingleDepertment,
};
