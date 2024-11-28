import { Request, Response } from 'express';
import { userServises } from './user.servises';

const creatUser = async (req: Request, res: Response) => {
  try {
    // Joi Schemas

    const { password, student } = req.body;

    // zod validaction data
    // const zodValidactionPart = studentValidationSchemaforzod.parse(data);

    // Call service to create a student
    const result = await userServises.createUserServerDB(password, student);

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

export const userContoller = {
  creatUser,
};
