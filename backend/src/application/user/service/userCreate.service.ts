import { User } from "../../../domain/user/entity/user.entity";
import { type IUserRepository } from "../../../domain/user/repository/user.repository";
import { CheckUserDuplicationDomainService } from "../../../domain/user/service/checkUserDuplication.domainService";
import { Email, HashedPassword, RawPassword, UserId, Username } from "../../../domain/user/value_object";
import { UserDuplicationError } from "../../../shared/exceptions/userDuplicationError";
import { CreateUserRequestDto } from "../dto/createUser.dto";

export class UserCreateService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly CheckUserDuplicationDomainService: CheckUserDuplicationDomainService
  ) { }

  async create(crateUserDto: CreateUserRequestDto): Promise<User> {
    const userId = UserId.generate();
    const username = new Username(crateUserDto.username);
    const password = new RawPassword(crateUserDto.password);
    const email = new Email(crateUserDto.email);
    const hashedPassword = await HashedPassword.hash(password);

    const user = new User(userId, username, email, hashedPassword);
    const isDuplicatedUser = await this.CheckUserDuplicationDomainService.execute(user.getEmail());
    if (isDuplicatedUser) {
      throw new UserDuplicationError("ユーザーが既に存在します");
    }

    return await this.userRepository.create(user);
  }

}
