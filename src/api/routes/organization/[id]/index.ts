import { Router } from "express";

const organizationRouter = Router();

organizationRouter.get("/");

organizationRouter.delete("/");

// organizationRouter.use("/permissions/");

export { organizationRouter };
