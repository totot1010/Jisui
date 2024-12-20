import bcrypt from 'bcrypt';

import { type IUserRepository } from "../../domain/user/repository/user.repository";
import { User } from "../../domain/user/entity/user.entity";
import { Email } from "../../domain/user/value_object";


export class UserFakeRepository implements IUserRepository {

  async create(user: User): Promise<User> {
    const userId = user.getUserId().value;
    const username = user.getUsername().value;
    const email = user.getEmail().value;
    const HashedPassword = user.getHashedPassword().value

    return User.reConstruct(userId, username, email, HashedPassword);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userId = 'userId';
    const username = 'username';
    const RawPassword = 'password';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(RawPassword, salt);

    return User.reConstruct(userId, username, email.value, hashedPassword);
  }

  async findById(userId: string): Promise<User | null> {
    const username = 'username';
    const RawPassword = 'password';
    const email = 'aaa@aaa.com';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(RawPassword, salt);

    return User.reConstruct(userId, username, email, hashedPassword);
  }

  async findAll(): Promise<User[]> {
    const userId = 'userId';
    const username = 'username';
    const RawPassword = 'password';
    const email = 'aaa@aaa.com';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(RawPassword, salt);

    return [User.reConstruct(userId, username, email, hashedPassword)];
  }
}
