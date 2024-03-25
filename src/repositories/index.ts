import { DataSource } from "typeorm";
import { OrganizationRepo } from "./Organization";
import { UserRepo } from "./User";
import { Context } from "../types";
import { PermissionRepo } from "./permission";

export const createRepos = (datasource: DataSource): Context["repos"] => {
  return {
    user: UserRepo.getInstance(datasource),
    organization: OrganizationRepo.getInstance(datasource),
    permission: PermissionRepo.getInstance(datasource),
  };
};
