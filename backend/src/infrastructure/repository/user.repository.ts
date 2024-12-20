import { PrismaClient } from "@prisma/client";
import { type IUserRepository } from "../../domain/user/repository/user.repository";
import { User } from "../../domain/user/entity/user.entity";
import { Email } from "../../domain/user/value_object";


export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create(user: User): Promise<User> {
    const { id, email, username, password } = await this.prisma.user.create({
      data: {
        id: user.getUserId().value,
        email: user.getEmail().value,
        username: user.getUsername().value,
        password: user.getHashedPassword().value,
      }
    });

    return User.reConstruct(id, username, email, password);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.value
      }
    });

    if (user === null) {
      return null;
    }

    return User.reConstruct(user.id, user.username, user.email, user.password);
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (user === null) {
      return null;
    }

    return User.reConstruct(user.id, user.username, user.email, user.password);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(user => {
      return User.reConstruct(user.id, user.username, user.email, user.password);
    });
  }
}
