"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFormatter = void 0;
const handleCastError = (err) => {
    return {
        statusCode: 400,
        message: "Invalid MongoDB Object Id",
    };
};
const handleDuplicateError = (err) => {
    const matchedArray = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArray[1]} is already exist`,
    };
};
const handleValidationError = (err) => {
    const errors = Object.values(err.errors);
    const errorSources = [];
    errors.forEach((errorObject) => errorSources.push({
        path: errorObject.path,
        message: errorObject.message,
    }));
    return {
        statusCode: 400,
        message: "Validation Error",
        errorSources
    };
};
const handleZodError = (err) => {
    const errorSources = [];
    err.issues.forEach((issue) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        });
    });
    return {
        message: 'Zod Error',
        statusCode: 400,
        errorSources
    };
};
exports.errorFormatter = {
    handleCastError,
    handleDuplicateError,
    handleValidationError,
    handleZodError
};
