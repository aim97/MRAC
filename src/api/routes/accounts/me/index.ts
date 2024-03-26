import { Router } from "express";

const accountRouter = Router();

// TODO: add docs and validation
/**
 * @openapi
 * /api/v1/accounts/me:
 *   tags:
 *   - "accounts"
 *   get:
 *     description: gets user profile information
 *
 */
accountRouter.get("/", async (req, res) => {
  res.status(200).json(req.context.user);
});

// accountRouter.patch("/");

// accountRouter.delete("/");

export { accountRouter };
