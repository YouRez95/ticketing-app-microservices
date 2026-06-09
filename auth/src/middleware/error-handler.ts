import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors(),
    });
  }

  // if (err instanceof RequestValidationError) {
  //   console.log("Handling this error as a request validation error");

  //   return res.status(400).send({ errors: formattedErrors });
  // }

  // if (err instanceof DatabaseConnectionError) {
  //   console.log("Handling this error as a db connection error");
  // }

  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};
