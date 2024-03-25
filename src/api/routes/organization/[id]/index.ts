import { Router } from "express";
import httpStatus from "http-status";
import { permissionsRouter } from "./permissions";
import { requireOrganizationRole } from "../../../middlewares/requireRole";
import { Role } from "../../../../common/constants";

const organizationRouter = Router();

organizationRouter.get("/", async (req, res) => {
  res.status(httpStatus.OK).json(req.context.organizationAccess?.organization!);
});

organizationRouter.use(
  "/permissions/",
  requireOrganizationRole([Role.Admin, Role.HR]),
  permissionsRouter,
);

export { organizationRouter };
