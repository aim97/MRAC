import { NextFunction, Request, Response } from "express";

export const requireAuthenticated = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  if (!req.context.user) throw new Error("UnAuthorized");
  next();
};
