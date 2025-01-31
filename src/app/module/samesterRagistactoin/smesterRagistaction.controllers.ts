import { Request, Response } from 'express';
import sendSuccess from '../utility/send-success';
import { ragistactionServises } from './smesterRagistaction.servises';
import httpStatus from 'http-status';

const createRagistaction = async (req: Request, res: Response) => {
  const result = await ragistactionServises.createRagistaction(req.body);
  sendSuccess(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message: 'Semester Registration Create Sucres',
    data: result,
  });
};
const findAllRagistaction = async (req: Request, res: Response) => {
  const result = await ragistactionServises.findAllRagistaction(req?.query);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Samester Ragistaction Retrived Success',
    data: result,
  });
};
const findoneRagistaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ragistactionServises.findoneRagistaction(id);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Samester Ragistaction Retrived Success',
    data: result,
  });
};
const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ragistactionServises.updateStatus(id, req.body);
  sendSuccess(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Samester Ragistaction Update Success',
    data: result,
  });
};

export const SemesterRegistrationController = {
  createRagistaction,
  findAllRagistaction,
  findoneRagistaction,
  updateStatus,
};
