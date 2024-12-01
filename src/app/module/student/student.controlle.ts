/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServeses } from './student.servises';
import catchAsynch from '../utility/catcingAsynch';

//hairorder function

const findStudent = catchAsynch(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await studentServeses.findAllStudentData();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      result,
    });
  },
);

const studentOneDeleted = catchAsynch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;

    // Call the service to delete the student
    const result = await studentServeses.deletedStudentone(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      result,
    });
  },
);
const studentOnefind = catchAsynch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    // Call the service to delete the student
    const result = await studentServeses.findOnedStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'Student find one successfully',
      result,
    });
  },
);
export const studentController = {
  findStudent,
  studentOneDeleted,
  studentOnefind,
};
