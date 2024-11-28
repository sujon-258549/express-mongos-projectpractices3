import { Request, Response } from 'express';
import { studentServeses } from './student.servises';

const findStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServeses.findAllStudentData();
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving students',
      error: error.details || error.message || 'An unexpected error occurred',
    });
  }
};

const studentOneDeleted = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message || 'Unknown error', // Safe error message
    });
  }
};
const studentOnefind = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message || 'Unknown error', // Safe error message
    });
  }
};

export const studentController = {
  findStudent,
  studentOneDeleted,
  studentOnefind,
};
