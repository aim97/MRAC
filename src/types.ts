import { UserRepo } from "./repositories/User";
import { OrganizationRepo } from "./repositories/Organization";
import { User } from "./entities/User";

export type Context = {
  repos: {
    user: UserRepo;
    organization: OrganizationRepo;
  };
  user?: User;
};

declare module "express-serve-static-core" {
  interface Request {
    context: Context;
  }

  // interface Response {
  //   myField?: string
  // }
}
