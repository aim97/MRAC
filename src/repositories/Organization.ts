import { DataSource, Repository } from "typeorm";
import { Organization } from "../entities/Organization";
import { User } from "../entities/User";

type CreateOrganizationInput = {
  name: string;
  ownerId: string;
};

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

  async create(input: CreateOrganizationInput) {
    const org = new Organization({
      name: input.name,
      owner: new User({ id: input.ownerId }),
    });
    await this.repo.save(org);
    return org;
  }

  async get(id: string) {
    return this.repo.findOne({ where: { id }, relations: { owner: true } });
  }

  async getUserOwnedOrganizations(userId: string): Promise<Organization[]> {
    return this.repo.find({ where: { owner: new User({ id: userId }) } });
  }
}
