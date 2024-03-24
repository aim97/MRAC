import { DataSource } from "typeorm";
import { OrganizationRepo } from "./Organization";
import { UserRepo } from "./User";
import { Context } from "../types";

export const createRepos = (datasource: DataSource): Context["repos"] => {
  return {
    user: UserRepo.getInstance(datasource),
    organization: OrganizationRepo.getInstance(datasource),
  };
};
