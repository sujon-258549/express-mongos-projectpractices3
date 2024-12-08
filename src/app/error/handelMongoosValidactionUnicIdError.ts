import { TErrorSource, TGenariErrorRequest } from '../interfaces/interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handelMongoosValidactionUnicIdError = (err: any): TGenariErrorRequest => {
  // "E11000 duplicate key error collection: first_project_repit.acadimicdepertments index: name_1 dup key: { name: \"CT\" }" how to extract value \"CT\"
  //
  const match = err.message.match(/dup key: { name: "(.*?)" }/);
  const errorMessage = match ? match[1] : null; // Extract the value or null if not found

  const errorSource: TErrorSource = [{ path: '', message: errorMessage }];

  return {
    statusCode: 400,
    message: 'Validation error occurred.',
    errorSource,
  };
};

export default handelMongoosValidactionUnicIdError;
