import { Request, NextFunction, Response } from "express";
import { Role } from "../../common/constants";

export const requireOrganizationRole =
  (roles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const permission = req.context.organizationAccess?.permission!;

    if (permission === "Owner" || roles.includes(permission?.role)) {
      next();
    } else {
      throw new Error(
        `role ${permission?.role} has no access to this requested resource`,
      );
    }
  };
