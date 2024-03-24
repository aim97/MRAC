import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { api } from "./api/routes";
import { Context } from "./types";
import { getAuthenticationMiddleware } from "./api/middlewares/authenticate";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "api",
      version: "1.0.0",
    },
  },
  apis: ["./src/api/**/*.ts"],
};

export const createApp = (context: Context) => {
  const app = express();

  const swaggerSpec = swaggerJSDoc(options);

  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use((req, _, next) => {
    req.context = context;
    next();
  });
  app.use(getAuthenticationMiddleware(context));

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
  );

  app.use("/api/v1/", api);

  return app;
};
