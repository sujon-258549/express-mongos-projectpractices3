import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { acadimicDepertmentServises } from './acadimicDepertment.servises';

const createFucalty = catchAsynch(async (req, res) => {
  const result = await acadimicDepertmentServises.createFaculty(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'Fucalty Created Successfuly',
    data: result,
  });
});

const findAllFaculty = catchAsynch(async (req, res) => {
  const result = await acadimicDepertmentServises.findAllFaculty();
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Fucalty All find Successfuly',
    data: result,
  });
});

const findSingleFaculty = catchAsynch(async (req, res) => {
  const { facultyId } = req.params;
  const result = await acadimicDepertmentServises.findoneFaculty(facultyId);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Fucalty single find Successfuly',
    data: result,
  });
});
const deleteSingleFaculty = catchAsynch(async (req, res) => {
  const { facultyId } = req.params;
  const result = await acadimicDepertmentServises.deleteoneFaculty(facultyId);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Fucalty deleted Successfuly',
    data: result,
  });
});

export const acadimicDepertmentContruller = {
  createFucalty,
  findAllFaculty,
  findSingleFaculty,
  deleteSingleFaculty,
};
