import { Router } from "express";
import httpStatus from "http-status";
import { requireAuthenticated } from "../../middlewares/requireAuthenticated";
import { accountRouter } from "./[id]";

const accountsRouter = Router();

/**
 * @openapi
 * /api/v1/accounts/signup:
 *   post:
 *     description: Allows a new user to create an account
 *     parameters:
 *     - name: username
 *       isRequired: true
 *       in: body
 *       schema:
 *         type: string
 *     - name: email
 *       isRequired: true
 *       in: body
 *       schema:
 *         type: string
 *     - name: password
 *       isRequired: true
 *       in: body
 *       schema:
 *         type: string
 *     responses:
 *       201:
 *         description: Returns the access token of the create user
 *         content:
 *           application/json:
 *             schema:
 *             - name: token
 *               schema:
 *                 type: string
 */
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

accountsRouter.use("/me", requireAuthenticated, accountRouter);

export { accountsRouter };
