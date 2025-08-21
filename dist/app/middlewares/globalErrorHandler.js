"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandle = void 0;
const env_1 = require("../config/env");
const AppError_1 = __importDefault(require("../helpers/AppError"));
const errorFormatter_1 = require("../helpers/errorFormatter");
const globalErrorHandle = (err, req, res, next) => {
    if (env_1.envVars.NODE_ENV === "development") {
        console.log(err);
    }
    let statusCode = 500;
    let message = `Something went wrong!! ${err.message}`;
    let errorsSource = [];
    // duplicate error
    if (err.code === 11000) {
        const simplifiedError = errorFormatter_1.errorFormatter.handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        // Object Id / mongoose id
    }
    else if (err.name === "CastError") {
        const simplifiedError = errorFormatter_1.errorFormatter.handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        // Zod Validation Error
    }
    else if (err.name === "ZodError") {
        const simplifiedError = errorFormatter_1.errorFormatter.handleZodError(err);
        message = simplifiedError.message;
        statusCode = simplifiedError.statusCode;
        errorsSource = simplifiedError.errorSources;
        // mongoose validation error
    }
    else if (err.name == "ValidationError") {
        const simplifiedError = errorFormatter_1.errorFormatter.handleValidationError(err);
        message = simplifiedError.message;
        statusCode = simplifiedError.statusCode;
        errorsSource = simplifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorsSource,
        err: env_1.envVars.NODE_ENV === "development" ? err : null,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null,
    });
};
exports.globalErrorHandle = globalErrorHandle;
