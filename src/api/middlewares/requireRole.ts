import { Request, NextFunction, Response } from "express";
import { Role } from "../../common/constants";

export const requireOrganizationRole =
  (role: Role) => async (req: Request, res: Response, next: NextFunction) => {
    if (!req.context.user) throw new Error("UnAuthorized");

    const organizationId = req.params["organizationId"];

    const { user } = req.context;
    const permission = user.permissions.find(
      ({ organization }) => organization.id === organizationId,
    );
    if (!permission || permission.role !== role)
      throw new Error("UnAuthorized");

    next();
  };
