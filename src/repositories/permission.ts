import { DataSource, Repository } from "typeorm";
import { Permission } from "../entities/permission";
import { PermissionActivityStatus, Role } from "../common/constants";
import { User } from "../entities/User";
import { Organization } from "../entities/Organization";

type CreateInvitationInput = {
  userId: string;
  organizationId: string;
  role: Role;
};

export class PermissionRepo {
  private static instance: PermissionRepo;

  private repo: Repository<Permission>;

  static getInstance(dataSource: DataSource) {
    if (PermissionRepo.instance == null) {
      PermissionRepo.instance = new PermissionRepo(dataSource);
    }
    return this.instance;
  }

  private constructor(private dataSource: DataSource) {
    this.repo = dataSource.getRepository(Permission);
  }

  public async getUserOrganizationPermission(
    userId: string,
    organizationId: string,
  ) {
    return this.repo.findOne({
      where: {
        employee: new User({ id: userId }),
        organization: new Organization({ id: organizationId }),
        status: PermissionActivityStatus.Active,
      },
      relations: {
        organization: true,
      },
    });
  }

  public async inviteUser({
    userId,
    organizationId,
    role,
  }: CreateInvitationInput) {
    const invite = new Permission({
      employee: new User({ id: userId }),
      organization: new Organization({ id: organizationId }),
      role,
      status: PermissionActivityStatus.Pending,
    });

    await this.repo.save(invite);

    return invite;
  }

  public async acceptInvitation(invitationId: string) {
    const acceptInvitationUpdate = new Permission({
      id: invitationId,
      status: PermissionActivityStatus.Active,
    });
    return this.repo.save(acceptInvitationUpdate);
  }

  public async revokePermission(permissionId: string) {
    const acceptInvitationUpdate = new Permission({
      id: permissionId,
      status: PermissionActivityStatus.Revoked,
    });
    return this.repo.save(acceptInvitationUpdate);
  }

  public async getUserAccessibleOrganizations(userId: string) {
    return this.repo.find({
      where: {
        employee: new User({ id: userId }),
        status: PermissionActivityStatus.Active,
      },
      relations: { organization: true },
    });
  }

  public async getUserOrganizationInvitations(userId: string) {
    return this.repo.find({
      where: {
        employee: new User({ id: userId }),
        status: PermissionActivityStatus.Pending,
      },
      relations: { organization: true },
    });
  }

  public async getOrganizationPermissions(organizationId: string) {
    return this.repo.find({
      where: {
        organization: new Organization({ id: organizationId }),
      },
      relations: {
        employee: true,
      },
    });
  }

  public async findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
