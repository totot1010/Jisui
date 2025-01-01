import { User } from "../../../domain/user/entity/user.entity";
import { UserNotFoundError } from "../../../domain/user/exceptions/userNotFoundError";
import { type IUserRepository } from "../../../domain/user/repository/user.repository";
import { CheckUserDuplicationDomainService } from "../../../domain/user/service/checkUserDuplication.domainService";
import { Email, HashedPassword, RawPassword, UserId, Username } from "../../../domain/user/value_object";
import { ValidationError } from "../../../shared/exceptions/validationError";
import { UpdateUserRequestDto } from "../dto/updateUser.dto";

export class UserUpdateService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly checkUserDuplicationDomainService: CheckUserDuplicationDomainService
  ) { }

  public async update(updateUserDto: UpdateUserRequestDto): Promise<User> {
    const { userId, email, username, password, passwordConfirm } = updateUserDto;

    const targetUserId = new UserId(userId);
    const targetUser = await this.userRepository.findById(targetUserId);
    if (!targetUser) {
      throw new UserNotFoundError("ユーザーが見つかりませんでした");
    }

    let updatedHashedPassword = targetUser.getHashedPassword();
    // パスワードが入力されている場合、ハッシュ化して更新
    if (password) {
      if (password !== passwordConfirm) {
        throw new ValidationError("パスワードが一致しません");
      }
      const updatedRawPassword = new RawPassword(password);
      updatedHashedPassword = await HashedPassword.hash(updatedRawPassword);
    }

    const updatedUsername = new Username(username);
    const updatedEmail = new Email(email);

    const user = new User(targetUserId, updatedUsername, updatedEmail, updatedHashedPassword);
    await this.checkUserDuplicationDomainService.execute(user.getEmail());

    return await this.userRepository.update(user);
  }
}
