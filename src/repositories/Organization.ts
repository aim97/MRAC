import { DataSource, Repository } from "typeorm";
import { Organization } from "../entities/Organization";

export class OrganizationRepo {
  private static instance: OrganizationRepo;

  private repo: Repository<Organization>;

  static getInstance(dataSource: DataSource) {
    if (OrganizationRepo.instance == null) {
      OrganizationRepo.instance = new OrganizationRepo(dataSource);
    }
    return this.instance;
  }

  private constructor(private dataSource: DataSource) {
    this.repo = dataSource.getRepository(Organization);
  }
}
