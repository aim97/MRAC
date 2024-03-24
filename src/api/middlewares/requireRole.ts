import { Request, NextFunction, Response } from "express";
import { Context } from "../../types";

export const requireOrganizationRole =
  (context: Context) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.context.user) throw new Error("UnAuthorized");

    const organizationId = req.params["organizationId"];

    const { user } = req.context;
    user;
  };
