"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelMongoosValidactionCastError = (err) => {
    const errorSource = [
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
exports.default = handelMongoosValidactionCastError;
