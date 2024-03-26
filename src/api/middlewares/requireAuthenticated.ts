import { NextFunction, Request, Response } from "express";
import { ApiError, ErrorCode } from "../../common/ApiError";

export const requireAuthenticated = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  if (!req.context.user)
    throw new ApiError(
      ErrorCode.UnAuthenticated,
      "Authentication is required for this action",
    );
  next();
};
