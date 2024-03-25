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

/**
 * @openapi
 * /api/v1/accounts/me:
 *   patch:
 *     description: update user information
 * @todo add docs and validation
 */
accountRouter.patch("/");

/**
 * @openapi
 * /api/v1/accounts/me:
 *   delete:
 *     description: delete user account
 * @todo add docs and validation
 */
accountRouter.delete("/");

export { accountRouter };
