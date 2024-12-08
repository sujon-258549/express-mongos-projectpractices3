import mongoose from 'mongoose';
import { TErrorSource, TGenariErrorRequest } from '../interfaces/interfaces';

const handelMongoosValidactionError = (
  err: mongoose.Error.ValidationError,
): TGenariErrorRequest => {
  const errorSource: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: val?.path,
      message: val?.message,
    }),
  );

  return {
    statusCode: 400,
    message: 'Validation error occurred.',
    errorSource,
  };
};

export default handelMongoosValidactionError;
