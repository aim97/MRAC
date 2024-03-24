import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { api } from "./api/routes";
import { Context } from "./types";

export const createApp = (context: Context) => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use((req, _, next) => {
    req.context = context;
    next();
  });

  app.use("/api/v1/", api);

  return app;
};
