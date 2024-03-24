import { Router } from "express";

const organizationRouter = Router();

organizationRouter.patch("/");

organizationRouter.get("/");

organizationRouter.delete("/");

organizationRouter.use("/permissions/");

export { organizationRouter };
