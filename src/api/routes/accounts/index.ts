import { Router } from "express";
import httpStatus from "http-status";
import { requireAuthenticated } from "../../middlewares/requireAuthenticated";
import { accountRouter } from "./me";
import {
  CreateNewUserInputRequestSchema,
  UserLoginCredentialsRequestSchema,
} from "./validation";
import { schemaValidator } from "../../../common/schemaValidator";

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
accountsRouter.post(
  "/signup",
  schemaValidator(CreateNewUserInputRequestSchema),
  async (req, res) => {
    const { body } = req;
    const { repos } = req.context;
    const token = await repos.user.create(body);
    if (!token)
      return res.status(httpStatus.FORBIDDEN).send({ error: "Invalid input" });
    res.status(httpStatus.CREATED).json({ token });
  },
);

/**
 * @openapi
 * /api/v1/accounts/login:
 *   post:
 *     description: Allows an existing user to login to his account
 *     parameters:
 *     - name: username
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
 *       200:
 *         description: Returns the access token of the create user
 *         content:
 *           application/json:
 *             schema:
 *             - name: token
 *               schema:
 *                 type: string
 */
accountsRouter.post(
  "/login",
  schemaValidator(UserLoginCredentialsRequestSchema),
  async (req, res) => {
    const { body } = req;
    const { repos } = req.context;
    const token = await repos.user.login(body);
    if (!token)
      return res.status(httpStatus.FORBIDDEN).send({ error: "Invalid input" });
    res.status(httpStatus.CREATED).json({ token });
  },
);

accountsRouter.use("/me", requireAuthenticated, accountRouter);

export { accountsRouter };
