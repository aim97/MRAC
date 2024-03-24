import { Router } from "express";
import R from "ramda";
import httpStatus from "http-status";
import { organizationRouter as organizationInstanceRouter } from "./[id]";
import { Permission } from "../../../entities/permission";
import { PermissionActivityStatus } from "../../../common/constants";

const organizationRouter = Router();

organizationRouter.post("/", async (req, res) => {
  const {
    body,
    context: { user, repos },
  } = req;

  const org = await repos.organization.create({
    ownerId: user!.id,
    name: body.name,
  });

  res.status(httpStatus.CREATED).json(org);
});

organizationRouter.get("/owned", async (req, res) => {
  res.status(httpStatus.OK).json(req.context.user!.ownedOrganizations);
});

organizationRouter.get("/accessible", async (req, res) => {
  res
    .status(httpStatus.OK)
    .json(
      req.context.user!.permissions.map(({ organization }) => organization),
    );
});

organizationRouter.get("/invites", async (req, res) => {
  const user = req.context.user!;
  const invited = user.permissions
    .filter(({ status }) => status === PermissionActivityStatus.Pending)
    .map(R.prop("organization"));
  res.status(httpStatus.OK).json(invited);
});

organizationRouter.get("/list", async (req, res) => {
  const user = req.context.user!;
  const [invited, accessible] = R.partition(
    (permission: Permission) =>
      permission.status === PermissionActivityStatus.Pending,
    user.permissions,
  );
  const response = {
    accessibleOrganizations: accessible
      .filter(({ status }) => status === PermissionActivityStatus.Active)
      .map(R.prop("organization")),
    ownedOrganizations: user.ownedOrganizations,
    invited: R.map(R.prop("organization"), invited),
  };
  res.status(httpStatus.OK).json(response);
});

organizationRouter.use("/:id", organizationInstanceRouter);

export { organizationRouter };
