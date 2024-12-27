"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handelMongoosValidactionUnicIdError = (err) => {
    // "E11000 duplicate key error collection: first_project_repit.acadimicdepertments index: name_1 dup key: { name: \"CT\" }" how to extract value \"CT\"
    //
    const match = err.message.match(/dup key: { name: "(.*?)" }/);
    const errorMessage = match ? match[1] : null; // Extract the value or null if not found
    const errorSource = [{ path: '', message: errorMessage }];
    return {
        statusCode: 400,
        message: 'Validation error occurred.',
        errorSource,
    };
};
exports.default = handelMongoosValidactionUnicIdError;
