import { User } from "../../../domain/user/entity/user.entity";
import { type IUserRepository } from "../../../domain/user/repository/user.repository";

export class UserQueryService {
  constructor(private readonly userRepository: IUserRepository) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
