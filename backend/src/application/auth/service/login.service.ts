import { UserNotFoundError } from "../../../domain/user/exceptions/userNotFoundError";
import { IUserRepository } from "../../../domain/user/repository/user.repository";
import { Email, RawPassword } from "../../../domain/user/value_object";
import { LoginRequestDto, LoginResponseDto } from "../dto/login.dto";
import { AuthenticationError } from "../exceptions/authenticationError";
import { TokenService } from "./token.service";


export class LoginService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenService: TokenService
  ) { }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const email = new Email(loginRequestDto.email);
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError("ユーザーが見つかりません");
    }

    // パスワードの照合
    const requestPassword = new RawPassword(loginRequestDto.password);
    const isPasswordMatch = await user.getHashedPassword().compare(requestPassword);

    if (!isPasswordMatch) {
      throw new AuthenticationError("パスワードが一致しません");
    }

    //  トークンの生成
    const { accessToken, refreshToken } = await this.tokenService.generateTokens(user.getUserId().value);
    return new LoginResponseDto(accessToken, refreshToken, user.getUserId().value, user.getUsername().value);
  }
}
