import { UserRepo } from "./repositories/User";
import { OrganizationRepo } from "./repositories/Organization";
import { User } from "./entities/User";
import { Organization } from "./entities/Organization";
import { PermissionRepo } from "./repositories/permission";
import { Permission } from "./entities/permission";

export type Context = {
  repos: {
    user: UserRepo;
    organization: OrganizationRepo;
    permission: PermissionRepo;
  };
  user?: User;
  organizationAccess?: {
    organization: Organization;
    permission: Permission | "Owner";
  };
};

declare module "express-serve-static-core" {
  interface Request {
    context: Context;
  }
}
