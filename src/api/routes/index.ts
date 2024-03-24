import { Router } from "express";
import { accountsRouter } from "./accounts";
import { organizationRouter } from "./organization";

const api = Router();
// api.use((req, res, next) => {
//   console.log(req.path);
//   next();
// })
api.use("/accounts/", accountsRouter);
api.use("organization/", organizationRouter);

export { api };
