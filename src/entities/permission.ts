import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { PermissionActivityStatus, Role } from "../common/constants";
import { Organization } from "./Organization";

@Entity({ name: "permission" })
export class Permission {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ name: "name", type: "varchar", enum: Object.values(Role) })
  public role: Role;

  @Column({
    name: "status",
    type: "varchar",
    enum: Object.values(PermissionActivityStatus),
  })
  public status: PermissionActivityStatus;

  @ManyToOne((type) => User, (user) => user.id)
  public employee: User;

  @ManyToOne((type) => Organization, (organization) => organization.id)
  public organization: Organization;

  @Column({ name: "created_at", type: "timestamptz" })
  public createdAt: Date;

  @Column({ name: "updated_at", type: "timestamptz" })
  public updatedAt: Date;
}
