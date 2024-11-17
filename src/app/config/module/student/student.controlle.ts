import { Request, Response } from 'express';
import { studentServeses } from './student.servises';

const createStudent = async (req: Request, res: Response) => {
  try {
    const data = req.body.student;
    const result = await studentServeses.createStudentServerDB(data);
    res.status(200).json({
      success: true,
      message: 'Student Create is success',
      result: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const findStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServeses.findAllStudentData();
    res.status(200).json({
      success: true,
      message: 'Student Create is success',
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentController = {
  createStudent,
  findStudent,
};
