import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { PermissionActivityStatus, Role } from "../common/constants";
import { Organization } from "./Organization";

@Entity({ name: "permission" })
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

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

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  constructor(input: Partial<Permission>) {
    Object.assign(this, input);
  }
}
