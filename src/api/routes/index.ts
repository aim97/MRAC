import { Router } from "express";
import { accountsRouter } from "./accounts";
import { organizationRouter } from "./organization";
import { requireAuthenticated } from "../middlewares/requireAuthenticated";

const api = Router();

api.use("/accounts/", accountsRouter);
api.use("/organizations/", requireAuthenticated, organizationRouter);

export { api };
