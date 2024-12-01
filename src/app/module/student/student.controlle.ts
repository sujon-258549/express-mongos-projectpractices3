/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServeses } from './student.servises';
import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';

//hairorder function

const findStudent = catchAsynch(async (req: Request, res: Response) => {
  const result = await studentServeses.findAllStudentData();
  sendSuccess(res, {
    statuscod: httpStatus.OK,
    success: true,
    message: 'User created successfully',
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
    result,
  });
});
const studentOnefind = catchAsynch(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  // Call the service to delete the student
  const result = await studentServeses.findOnedStudent(studentId);
  res.status(200).json({
    success: true,
    message: 'Student find one successfully',
    result,
  });
});
export const studentController = {
  findStudent,
  studentOneDeleted,
  studentOnefind,
};
