import mongoose from 'mongoose';
import { TErrorSource, TGenariErrorRequest } from '../interfaces/interfaces';

const handelMongoosValidactionCastError = (
  err: mongoose.Error.CastError,
): TGenariErrorRequest => {
  const errorSource: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: 'invalid object Id',
    errorSource,
  };
};

export default handelMongoosValidactionCastError;
