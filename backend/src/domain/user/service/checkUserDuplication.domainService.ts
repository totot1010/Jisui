import { UserDuplicationError } from "../exceptions/userDuplicationError";
import { IUserRepository } from "../repository/user.repository";
import { Email } from "../value_object";


export class CheckUserDuplicationDomainService {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(email: Email): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!!user) {
      throw new UserDuplicationError("ユーザーが既に存在します");
    }
  }
}
