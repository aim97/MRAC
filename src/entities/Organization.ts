import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "organization" })
export class Organization {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @Column({ name: "name", type: "varchar" })
  public name: String;

  @Column({ name: "created_at", type: "timestamptz" })
  public createdAt: Date;

  @Column({ name: "updated_at", type: "timestamptz" })
  public updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.id)
  public owner: User;

  constructor() {}
}
