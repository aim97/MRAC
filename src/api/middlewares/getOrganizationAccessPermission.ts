import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const getOrganizationAccessPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // assumes user is already authenticated it
    const { user, repos } = req.context;

    const organizationId = req.params.organizationId;
    console.log({ organizationId });
    const organization = await repos.organization.get(organizationId);
    if (!organization) throw new Error("UnAuthorized");
    if (organization.owner.id === user!.id) {
      req.context.organizationAccess = {
        organization: organization!,
        permission: "Owner",
      };
    } else {
      const permission = await repos.permission.getUserOrganizationPermission(
        user!.id,
        organizationId,
      );
      if (!permission) throw new Error("UnAuthorized");
      req.context.organizationAccess = {
        organization: permission?.organization!,
        permission: permission!,
      };
    }
    next();
  } catch (e) {
    if (e instanceof Error) {
      res.status(httpStatus.NOT_FOUND).json({ message: e.message });
    }
  }
};
