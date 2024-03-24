import { DataSource } from "typeorm";
import { env } from "../config";
import { User } from "./User";
import { Organization } from "./Organization";
import { Permission } from "./permission";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: env.POSTGRES_URI,
  port: 5432,
  entities: [User, Organization, Permission],
  schema: "org_auth",
  applicationName: "org_auth",
  migrationsRun: true,
  migrationsTableName: "migrations",
  migrationsTransactionMode: "each",
  logging: env.NODE_ENV === "development",
  synchronize: true,
});
