import { User } from "../entity/user.entity";
import { Email } from "../value_object";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: Email): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
