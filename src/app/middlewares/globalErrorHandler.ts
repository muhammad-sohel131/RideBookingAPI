import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../helpers/AppError";
import { IErrorSources } from "../interfaces/error.types";
import { errorFormatter } from "../helpers/errorFormatter";

export const globalErrorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }

  let statusCode = 500;
  let message = `Something went wrong!! ${err.message}`;
  let errorsSource: IErrorSources[] = [];

  // duplicate error
  if (err.code === 11000) {
    const simplifiedError = errorFormatter.handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;

    // Object Id / mongoose id
  } else if (err.name === "CastError") {
    const simplifiedError = errorFormatter.handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;

    // Zod Validation Error
  } else if (err.name === "ZodError") {
    const simplifiedError = errorFormatter.handleZodError(err);

    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorsSource = simplifiedError.errorSources as IErrorSources[];

    // mongoose validation error
  } else if (err.name == "ValidationError") {
    const simplifiedError = errorFormatter.handleValidationError(err);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorsSource = simplifiedError.errorSources as IErrorSources[];

  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorsSource,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
