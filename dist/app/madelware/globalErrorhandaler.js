"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const zodError_1 = __importDefault(require("../error/zodError"));
const mongosValidactionerror_1 = __importDefault(require("../error/mongosValidactionerror"));
const handelMongoosValidactionCastError_1 = __importDefault(require("../error/handelMongoosValidactionCastError"));
const handelMongoosValidactionUnicIdError_1 = __importDefault(require("../error/handelMongoosValidactionUnicIdError"));
const apperror_1 = __importDefault(require("../error/apperror"));
// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = error.message || 'Something went wrong.';
    let errorSource = [
        {
            path: '',
            message: 'something went wrond',
        },
    ];
    // Handle Zod validation errors
    if (error instanceof zod_1.ZodError) {
        //main work
        const zodErrorDetails = (0, zodError_1.default)(error);
        statusCode = zodErrorDetails.statusCode;
        message = zodErrorDetails.message;
        errorSource = zodErrorDetails.errorSource;
    }
    else if (error.name === 'ValidationError') {
        const simplefideError = (0, mongosValidactionerror_1.default)(error);
        statusCode = simplefideError.statusCode;
        message = simplefideError.message;
        errorSource = simplefideError.errorSource;
    }
    else if (error.name === 'CastError') {
        const simplefideError = (0, handelMongoosValidactionCastError_1.default)(error);
        statusCode = simplefideError.statusCode;
        message = simplefideError.message;
        errorSource = simplefideError.errorSource;
    }
    else if (error.code === 11000) {
        const simplefideError = (0, handelMongoosValidactionUnicIdError_1.default)(error);
        statusCode = simplefideError.statusCode;
        message = simplefideError.message;
        errorSource = simplefideError.errorSource;
    }
    else if (error instanceof apperror_1.default) {
        statusCode = error.StatusCod;
        message = error.message;
        errorSource = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorSource = [
            {
                path: '',
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    // Respond with error details
    res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        error,
        // stack: config.NODE_ENV === 'development' ? error.stack : undefined, // Include stack trace in dev mode only
        stack: config_1.default.NODE_ENV === 'development' ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
};
exports.default = globalErrorHandler;
