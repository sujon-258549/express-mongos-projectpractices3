import { Request, Response } from 'express';
import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { acadimicSamesterServises } from './acedunuc.servises';

const acadimicSamester = catchAsynch(async (req: Request, res: Response) => {
  const result = await acadimicSamesterServises.createAcedimic(req.body);
  sendSuccess(res, {
    statuscod: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const accadimicSamesterController = {
  createAcadimicSamester: acadimicSamester,
};
