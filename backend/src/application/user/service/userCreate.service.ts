import { User } from "../../../domain/user/entity/user.entity";
import { type IUserRepository } from "../../../domain/user/repository/user.repository";
import { Email, HashedPassword, RawPassword, UserId, Username } from "../../../domain/user/value_object";
import { CreateUserRequestDto } from "../dto/createUser.dto";

export class UserCreateService {
  constructor(private readonly userRepository: IUserRepository) { }

  async create(crateUserDto: CreateUserRequestDto): Promise<User> {
    const userId = UserId.generate();
    const username = new Username(crateUserDto.username);
    const password = new RawPassword(crateUserDto.password);
    const email = new Email(crateUserDto.email);

    const hashedPassword = HashedPassword.hash(password);

    const user = new User(userId, username, email, hashedPassword);

    return await this.userRepository.create(user);
  }

}
