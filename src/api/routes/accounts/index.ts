import { Router } from "express";
import httpStatus from "http-status";

const accountsRouter = Router();

accountsRouter.use((req, res, next) => {
  console.log(req.method + " " + req.path);
  next();
});

accountsRouter.post("/signup", async (req, res) => {
  const { body } = req;
  const { repos } = req.context;
  console.log({ body });
  const token = await repos.user.create(body);
  if (!token)
    return res.status(httpStatus.FORBIDDEN).send({ error: "Invalid input" });
  res.status(httpStatus.CREATED).json({ token });
});

accountsRouter.post("/login", async (req, res) => {
  const { body } = req;
  const { repos } = req.context;
  console.log({ body });
  const token = await repos.user.login(body);
  if (!token)
    return res.status(httpStatus.FORBIDDEN).send({ error: "Invalid input" });
  res.status(httpStatus.CREATED).json({ token });
});

accountsRouter.use("/:id", accountsRouter);

export { accountsRouter };
