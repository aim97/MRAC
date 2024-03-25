import { Router } from "express";
import httpStatus from "http-status";
import { permissionsRouter } from "./permissions";

const organizationRouter = Router();

organizationRouter.get("/", async (req, res) => {
  res.status(httpStatus.OK).json(req.context.organizationAccess?.organization!);
});

organizationRouter.use("/permissions/", permissionsRouter);

export { organizationRouter };
