import { NextFunction, Request, Response } from 'express';
import { userServises } from './user.servises';

const creatUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student } = req.body;

    // zod validaction data
    // const zodValidactionPart = studentValidationSchemaforzod.parse(data);

    // Call service to create a student
    const result = await userServises.createUserServerDB(password, student);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const userContoller = {
  creatUser,
};
