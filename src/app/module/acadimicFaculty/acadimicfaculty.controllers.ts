import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';
import { facultyServises } from './acadimic.faculty.servises';

// const createFucalty = catchAsynch(async (req, res) => {
//   const result = await facultyServises.createFaculty(req.body);
//   sendSuccess(res, {
//     statuscod: httpStatus.CREATED,
//     success: true,
//     message: 'Fucalty Created Successfuly',
//     data: result,
//   });
// });

const findAllFaculty = catchAsynch(async (req, res) => {
  const result = await facultyServises.findAllFaculty(req.query);
  console.log(req.cookies);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Fucalty All find Successfuly',
    data: result,
  });
});

const findSingleFaculty = catchAsynch(async (req, res) => {
  const { facultyId } = req.params;
  const result = await facultyServises.findoneFaculty(facultyId);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Fucalty single find Successfuly',
    data: result,
  });
});
const deleteSingleFaculty = catchAsynch(async (req, res) => {
  const { facultyId } = req.params;
  const result = await facultyServises.deleteoneFaculty(facultyId);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Fucalty deleted Successfuly',
    data: result,
  });
});

export const facultyContruller = {
  //   createFucalty,
  findAllFaculty,
  findSingleFaculty,
  deleteSingleFaculty,
};
