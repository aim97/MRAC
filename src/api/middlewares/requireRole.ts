import { Request, NextFunction, Response } from "express";
import { Role } from "../../common/constants";
import { ApiError, ErrorCode } from "../../common/ApiError";

export const requireOrganizationRole =
  (roles: Role[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const permission = req.context.organizationAccess?.permission!;

    if (permission === "Owner" || roles.includes(permission?.role)) {
      next();
    } else {
      throw new ApiError(
        ErrorCode.UnAuthorized,
        `role ${permission?.role} has no access to this requested resource`,
      );
    }
  };
