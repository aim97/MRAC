import { Request, NextFunction, Response } from "express";
import { Context } from "../../types";

export const getAuthenticationMiddleware =
  (context: Context) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user: userRepo } = context.repos;
      const token: string = req.headers["x-auth-token"] ?? req.cookies["token"];
      const user = await userRepo.authenticate(token);
      console.log({ user });
      req.context.user = user;
      next();
    } catch (e) {
      next();
    }
  };
