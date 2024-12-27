"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handelMongoosValidactionError = (err) => {
    const errorSource = Object.values(err.errors).map((val) => ({
        path: val === null || val === void 0 ? void 0 : val.path,
        message: val === null || val === void 0 ? void 0 : val.message,
    }));
    return {
        statusCode: 400,
        message: 'Validation error occurred.',
        errorSource,
    };
};
exports.default = handelMongoosValidactionError;
