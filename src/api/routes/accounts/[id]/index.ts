import { Router } from "express";

const accountRouter = Router();

accountRouter.get("/", async (req, res) => {
  res.status(200).json(req.context.user);
});

accountRouter.patch("/");

accountRouter.delete("/");

export { accountRouter };
