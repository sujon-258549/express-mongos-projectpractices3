import { NextFunction, Request, Response } from 'express';
import { studentServeses } from './student.servises';

const findStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServeses.findAllStudentData();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

const studentOneDeleted = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;

    // Call the service to delete the student
    const result = await studentServeses.deletedStudentone(studentId);
    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};
const studentOnefind = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;

    // Call the service to delete the student
    const result = await studentServeses.findOnedStudent(studentId);
    res.status(200).json({
      success: true,
      message: 'Student find one successfully',
      result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};
export const studentController = {
  findStudent,
  studentOneDeleted,
  studentOnefind,
};
