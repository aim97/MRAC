import { Router } from "express";
import R from "ramda";
import { Permission } from "../../../../entities/permission";
import httpStatus from "http-status";

const permissionsRouter = Router();

// only owner, admins, and HR
permissionsRouter.get("/", async (req, res) => {
  const { repos, organizationAccess } = req.context;
  const organizationPermissions =
    await repos.permission.getOrganizationPermissions(
      organizationAccess!.organization.id,
    );
  const result = R.groupBy(
    ({ status }: Permission) => status,
    organizationPermissions,
  );
  res.status(httpStatus.OK).json(result);
});

// owner of organization and owner of permission
permissionsRouter.get("/:permissionId", async (req, res) => {
  const permissionId = req.params.permissionId;
  const { repos } = req.context;
  const permission = await repos.permission.findById(permissionId);
  if (!permission) return res.status(httpStatus.NOT_FOUND).json({});
  res.status(httpStatus.OK).json(permission);
});

permissionsRouter.post("/", async (req, res) => {
  const {
    body: { email, role },
    context: { repos, organizationAccess },
  } = req;
  const user = await repos.user.getUserByEmail(email);
  if (user) {
    const invitation = await repos.permission.inviteUser({
      userId: user.id,
      organizationId: organizationAccess!.organization.id,
      role,
    });

    res.status(httpStatus.CREATED).json(invitation);
  }
  res.status(httpStatus.BAD_REQUEST).end("Invalid User");
});

// only owner, admin or HR
permissionsRouter.post("/:permissionId/revoke", async (req, res) => {
  const permissionId = req.params.permissionId;
  const {
    context: { repos },
  } = req;

  const permission = await repos.permission.revokePermission(permissionId);

  res.status(httpStatus.OK).json(permission);
});

export { permissionsRouter };
