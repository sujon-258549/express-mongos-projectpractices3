/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { studentServeses } from './student.servises';
import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import httpStatus from 'http-status';

//hairorder function

const findStudent = catchAsynch(async (req: Request, res: Response) => {
  const result = await studentServeses.findAllStudentData(req.query);
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'User retrieved  successfully',
    data: result,
  });
});

const studentOneDeleted = catchAsynch(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  // Call the service to delete the student
  const result = await studentServeses.deletedStudentone(studentId);
  res.status(200).json({
    success: true,
    message: 'Student deleted successfully',
    data: result,
  });
});
const studentOnefind = catchAsynch(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  // Call the service to delete the student
  const result = await studentServeses.findOnedStudent(studentId);
  res.status(200).json({
    success: true,
    message: 'Student find one successfully',
    data: result,
  });
});
const updateStudentOnefind = catchAsynch(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;
    const { student } = req.body;
    // Call the service to delete the student
    const result = await studentServeses.updateStudent(studentId, student);
    res.status(200).json({
      success: true,
      message: 'Student filed update successfully',
      data: result,
    });
  },
);
export const studentController = {
  findStudent,
  studentOneDeleted,
  studentOnefind,
  updateStudentOnefind,
};
