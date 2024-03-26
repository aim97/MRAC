import { Router } from "express";
import httpStatus from "http-status";
import { organizationRouter as organizationInstanceRouter } from "./[id]";
import { getOrganizationAccessPermission } from "../../middlewares/getOrganizationAccessPermission";

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
  const { user, repos } = req.context;
  const ownedOrganizations = await repos.organization.getUserOwnedOrganizations(
    user!.id,
  );
  res.status(httpStatus.OK).json(ownedOrganizations);
});

organizationRouter.get("/accessible", async (req, res) => {
  const { user, repos } = req.context;
  const accessibleOrgs = await repos.permission.getUserAccessibleOrganizations(
    user?.id!,
  );
  res.status(httpStatus.OK).json(accessibleOrgs);
});

organizationRouter.get("/invites", async (req, res) => {
  const { user, repos } = req.context;
  const invitations = await repos.permission.getUserOrganizationInvitations(
    user!.id,
  );
  res.status(httpStatus.OK).json(invitations);
});

organizationRouter.post("/invites/:invitationId/accept", async (req, res) => {
  const { user, repos } = req.context;
  const invitationId = req.params.invitationId;
  const permission = await repos.permission.acceptInvitation(
    user!.id,
    invitationId,
  );
  res.status(httpStatus.OK).json(permission);
});

organizationRouter.use(
  "/:organizationId",
  getOrganizationAccessPermission,
  organizationInstanceRouter,
);

export { organizationRouter };
