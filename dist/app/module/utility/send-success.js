"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendSuccess = (res, data) => {
    res.status(data.statuscod).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendSuccess;
