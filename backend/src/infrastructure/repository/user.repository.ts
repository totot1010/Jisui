import { type IUserRepository } from "../../domain/user/repository/user.repository";
import { User } from "../../domain/user/entity/user.entity";
import { Email, UserId } from "../../domain/user/value_object";
import { prisma } from "../prisma/prisma";
import { Prisma, PrismaClient } from "@prisma/client";
import { transactionContext } from "../prisma/transactionContext";


export class UserRepository implements IUserRepository {
  private getClient(): Prisma.TransactionClient | PrismaClient {
    return transactionContext.getStore() ?? prisma;
  }

  async create(user: User): Promise<User> {
    const client = this.getClient();
    const { id, email, username, password } = await client.user.create({
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
    const client = this.getClient();
    const user = await client.user.findUnique({
      where: {
        email: email.value
      }
    });

    if (user === null) {
      return null;
    }

    return User.reConstruct(user.id, user.username, user.email, user.password);
  }

  async findById(userId: UserId): Promise<User | null> {
    const client = this.getClient();
    const user = await client.user.findUnique({
      where: {
        id: userId.value
      }
    });

    if (user === null) {
      return null;
    }

    return User.reConstruct(user.id, user.username, user.email, user.password);
  }

  async findAll(): Promise<User[]> {
    const client = this.getClient();
    const users = await client.user.findMany();

    return users.map(user => {
      return User.reConstruct(user.id, user.username, user.email, user.password);
    });
  }

  async update(user: User): Promise<User> {
    console.log("email", user.getEmail().value);
    const { id, email, username, password } = await prisma.user.update({
      where: {
        id: user.getUserId().value
      },
      data: {
        email: user.getEmail().value,
        username: user.getUsername().value,
        password: user.getHashedPassword().value,
      }
    });

    return User.reConstruct(id, username, email, password);
  }

}
