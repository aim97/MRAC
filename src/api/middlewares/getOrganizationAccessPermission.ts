import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ApiError, ErrorCode } from "../../common/ApiError";

export const getOrganizationAccessPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // assumes user is already authenticated it
  const { user, repos } = req.context;

  const organizationId = req.params.organizationId;
  const organization = await repos.organization.get(organizationId);
  if (!organization)
    throw new ApiError(ErrorCode.NotFound, "Organization not found");
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
    if (!permission)
      throw new ApiError(
        ErrorCode.UnAuthorized,
        "You have no permission to access organization resources",
      );
    req.context.organizationAccess = {
      organization: permission?.organization!,
      permission: permission!,
    };
  }
  next();
};
