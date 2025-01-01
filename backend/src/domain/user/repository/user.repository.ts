import { User } from "../entity/user.entity";
import { Email, UserId } from "../value_object";

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
}
