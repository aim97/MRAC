import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Permission } from "./permission";
import { Organization } from "./Organization";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ name: "email", type: "varchar" })
  public email: string;

  @Column({ name: "username", type: "varchar" })
  public username: string;

  @Column({ name: "password", type: "varchar" })
  public password: string;

  @CreateDateColumn({ name: "created_at" })
  public createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  public updatedAt: Date;

  @OneToMany((type) => Permission, (permission) => permission.employee)
  permissions: Permission[];

  @OneToMany((type) => Organization, (org) => org.owner)
  ownedOrganizations: Organization[];
}
