import { Router } from "express";

const permissionsRouter = Router();

// only owner, admins, and HR
permissionsRouter.get("/");

// owner of organization and owner of permission
permissionsRouter.get("/:id");

permissionsRouter.post("/");

// only owner, admin or HR
permissionsRouter.delete("/");

export { permissionsRouter };
