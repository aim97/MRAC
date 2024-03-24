import { Router } from "express";

const permissionsRouter = Router();

permissionsRouter.get("/");

permissionsRouter.get("/:id");

permissionsRouter.post("/");

permissionsRouter.delete("/");

export { permissionsRouter };
