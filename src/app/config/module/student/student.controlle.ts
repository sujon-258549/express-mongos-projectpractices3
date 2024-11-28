import { Request, Response } from 'express';
import { studentServeses } from './student.servises';
import studentValidationSchemaforzod from './zod.validaction';

const createStudent = async (req: Request, res: Response) => {
  try {
    // Joi Schemas

    const data = req.body.student;

    // zod validaction data
    const zodValidactionPart = studentValidationSchemaforzod.parse(data);

    // Validate student data
    // const { error, value } = studenvalidactiontSchema.validate(data, {
    //   abortEarly: false,
    // });
    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Validation Error',
    //     errors: error.details.map((err) => err.message),
    //   });
    // }

    // Call service to create a student
    const result =
      await studentServeses.createStudentServerDB(zodValidactionPart);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating student',
      error: error,
    });
  }
};

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
  createStudent,
  findStudent,
  studentOneDeleted,
  studentOnefind,
};
