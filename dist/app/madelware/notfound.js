"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    const statusCode = 500;
    const message = 'Router is Notfound !';
    res.status(statusCode).json({
        success: false,
        message: message,
        Error: 'Pleaces inter rite route',
    });
};
exports.default = notFound;
