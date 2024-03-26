import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { AnyZodObject, ZodError } from "zod";
import { ApiError, ErrorCode } from "./ApiError";

export const schemaValidator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(httpStatus.BAD_REQUEST).json({
          message: `Validation Error: ${error.message}`,
          details: error.issues.map((issue) => ({
            field: issue.path,
            message: issue.message,
          })),
        });
      } else throw new ApiError(ErrorCode.ServerError, String(error));
    }
  };
