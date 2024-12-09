import { ZodError, ZodIssue } from 'zod';
import { TErrorSource, TGenariErrorRequest } from '../interfaces/interfaces';

//   next work defarent file this cod write
const handleZodError = (zodError: ZodError): TGenariErrorRequest => {
  const formattedErrors: TErrorSource = zodError.issues.map(
    (issue: ZodIssue) => ({
      path: issue.path[issue.path.length - 1] || 'unknown',
      message: issue.message,
    }),
  );
  return {
    statusCode: 400,
    message: 'Validation error occurred.',
    errorSource: formattedErrors,
  };
};

export default handleZodError;
