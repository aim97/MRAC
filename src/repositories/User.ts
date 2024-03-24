import { DataSource, Repository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../entities/User";
import { env } from "../config";

type CreateUserInput = {
  username: string;
  password: string;
  email: string;
};

type Credentials = {
  username: string;
  password: string;
};

type TokenPayload = {
  username: string;
  email: string;
  randomSequence: string;
};

export class UserRepo {
  private static instance: UserRepo;

  private repo: Repository<User>;

  static getInstance(dataSource: DataSource) {
    if (UserRepo.instance == null) {
      UserRepo.instance = new UserRepo(dataSource);
    }
    return this.instance;
  }

  private constructor(private dataSource: DataSource) {
    this.repo = dataSource.getRepository(User);
  }

  private generateToken(user: User) {
    const payload: TokenPayload = {
      username: user.username,
      email: "user.email",
      randomSequence: "",
    };
    var token = jwt.sign(payload, env.KEY, {
      expiresIn: 60 * 60,
    });

    return token;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 8);
  }

  private async verifyPassword(
    plainText: string,
    hashedValue: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainText, hashedValue);
  }

  private async decodeToken(token: string) {
    try {
      const { username } = jwt.verify(token, env.KEY) as TokenPayload;
      const user = await this.getUserByUserName(username);
      return user;
    } catch (e) {
      return null;
    }
  }

  async getUserByUserName(username: string) {
    const user = await this.repo.findOne({
      where: { username },
      relations: {
        ownedOrganizations: true,
        permissions: true,
      },
    });
    return user;
  }

  async create(userData: CreateUserInput) {
    console.log({ userData });
    const password = await this.hashPassword(userData.password);
    const user = this.repo.create({ ...userData, password });
    this.repo.save(user);
    return this.generateToken(user);
  }

  async authenticate(token: string) {
    const user = await this.decodeToken(token);
    if (!user) throw new Error("Not found");
    return user;
  }

  async login(credentials: Credentials) {
    const { username, password } = credentials;
    const user = await this.getUserByUserName(username);
    if (!user || !(await this.verifyPassword(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    return this.generateToken(user);
  }
}
