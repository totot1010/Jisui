import bcrypt from 'bcrypt';

import { type IUserRepository } from "../../domain/user/repository/user.repository";
import { User } from "../../domain/user/entity/user.entity";
import { Email, UserId } from "../../domain/user/value_object";


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

  async findById(userId: UserId): Promise<User | null> {
    const username = 'username';
    const RawPassword = 'password';
    const email = 'aaa@aaa.com';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(RawPassword, salt);

    return User.reConstruct(userId.value, username, email, hashedPassword);
  }

  async findAll(): Promise<User[]> {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword1 = await bcrypt.hash("aaabbbccc123", salt);
    const user1 = User.reConstruct(
      UserId.generate().value,
      'user1',
      'aaa@aaa.com',
      hashedPassword1
    )

    const hashedPassword2 = await bcrypt.hash("dddeeefff123", salt);
    const user2 = User.reConstruct(
      UserId.generate().value,
      'user2',
      'bbb@bbb.com',
      hashedPassword2
    )

    return [user1, user2];
  }

  async update(user: User): Promise<User> {
    const userId = user.getUserId().value;
    const username = user.getUsername().value;
    const email = user.getEmail().value;
    const HashedPassword = user.getHashedPassword().value

    return User.reConstruct(userId, username, email, HashedPassword);
  }

}
