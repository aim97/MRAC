import { Request, NextFunction, Response } from "express";
import { Context } from "../../types";
import { Role } from "../../common/constants";

export const requireOrganizationRole =
  (context: Context, role: Role) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.context.user) throw new Error("UnAuthorized");

    const organizationId = parseInt(req.params["organizationId"]);

    const { user } = req.context;
    const permission = user.permissions.find(
      ({ organization }) => organization.id === organizationId,
    );
    if (!permission || permission.role !== role)
      throw new Error("UnAuthorized");

    next();
  };
