import { IUserRepository } from "../repository/user.repository";
import { Email } from "../value_object";


export class CheckUserDuplicationDomainService {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(email: Email): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    return !!user;
  }
}
