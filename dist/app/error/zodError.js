"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//   next work defarent file this cod write
const handleZodError = (zodError) => {
    const formattedErrors = zodError.issues.map((issue) => ({
        path: issue.path[issue.path.length - 1] || 'unknown',
        message: issue.message,
    }));
    return {
        statusCode: 400,
        message: 'Validation error occurred.',
        errorSource: formattedErrors,
    };
};
exports.default = handleZodError;
