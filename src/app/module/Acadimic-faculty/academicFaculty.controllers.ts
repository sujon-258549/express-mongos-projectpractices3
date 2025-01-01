import httpStatus from 'http-status';
import sendSuccess from '../utility/send-success';
import catchAsynch from '../utility/catcingAsynch';
import { AcademicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty = catchAsynch(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created succesfully',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsynch(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB(
    req.query,
  );

  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Academic faculties are retrieved successfully',
    // meta: result.meta,
    data: result.result,
  });
});

const getSingleAcademicFaculty = catchAsynch(async (req, res) => {
  const { facultyId } = req.params;

  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Academic faculty is retrieved succesfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsynch(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );

  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'Academic faculty is updated succesfully',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
