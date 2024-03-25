import { NextFunction, Request, Response, Router } from "express";
import { accountsRouter } from "./accounts";
import { organizationRouter } from "./organization";
import { requireAuthenticated } from "../middlewares/requireAuthenticated";
import httpStatus from "http-status";

const api = Router();

api.use("/accounts/", accountsRouter);
api.use("/organizations/", requireAuthenticated, organizationRouter);

api.use(async (err: Error, _: Request, res: Response, __: NextFunction) => {
  console.log({ err });
  res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({ message: "Internal server error" });
});

export { api };
