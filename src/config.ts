import { cleanEnv, str, url } from "envalid";
require("dotenv").config();

export const env = cleanEnv(process.env, {
  POSTGRES_URI: url(),
  KEY: str(),
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),
});
