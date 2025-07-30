import mongoose from "mongoose";
import { IErrorSources, IGenericErrorResponse } from "../interfaces/error.types";

const handleCastError = (err: mongoose.Error.CastError): IGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB Object Id",
  };
};

const handleDuplicateError = (err: any) : IGenericErrorResponse => {
  const matchedArray = err.message.match(/"([^"]*)"/);
  return {
    statusCode: 400,
    message: `${matchedArray[1]} is already exist`,
  };
};
const handleValidationError = (err: any) : IGenericErrorResponse => {
  const errors = Object.values(err.errors);
  const errorSources: IErrorSources[] = [];

  errors.forEach((errorObject: any) =>
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    })
  );

  return{
    statusCode: 400,
    message: "Validation Error",
    errorSources
  }
}
const handleZodError = (err: any): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = []
   err.issues.forEach((issue: any) => {
      errorSources.push({
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      });
    });

    return{
      message: 'Zod Error',
      statusCode: 400,
      errorSources
    }
}

export const errorFormatter = {
    handleCastError,
    handleDuplicateError,
    handleValidationError,
    handleZodError
}