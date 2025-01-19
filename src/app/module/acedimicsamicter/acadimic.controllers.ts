import { Request, Response } from 'express';
import catchAsynch from '../utility/catcingAsynch';
import sendSuccess from '../utility/send-success';
import { acadimicSamesterServises } from './acedunuc.servises';
import httpStatus from 'http-status';

const createAcadimicSamester = catchAsynch(
  async (req: Request, res: Response) => {
    const result = await acadimicSamesterServises.createAcedimic(req.body);
    sendSuccess(res, {
      statuscode: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  },
);

const findallAcadimicSamester = catchAsynch(
  async (req: Request, res: Response) => {
    const result = await acadimicSamesterServises.findAllsamester(req.query);
    sendSuccess(res, {
      statuscode: 200,
      success: true,
      message: 'Successfuly Find all data',
      data: result,
    });
  },
);
const findSpicifySamester = catchAsynch(async (req: Request, res: Response) => {
  const { _id } = req.params;
  const result = await acadimicSamesterServises.findSpisifysamester(_id);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Successfuly Find Single data',
    data: result,
  });
});

export const accadimicSamesterController = {
  createAcadimicSamester,
  findallAcadimicSamester,
  findSpicifySamester,
};
