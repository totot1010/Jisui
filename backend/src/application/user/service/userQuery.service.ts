import { User } from "../../../domain/user/entity/user.entity";
import { type IUserRepository } from "../../../domain/user/repository/user.repository";
import { UserId } from "../../../domain/user/value_object";
import { GetUserRequestDto, GetUserResponseDto } from "../dto/getUser.dto";

export class UserQueryService {
  constructor(private readonly userRepository: IUserRepository) { }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getById(requestDto: GetUserRequestDto): Promise<GetUserResponseDto> {
    const targetUserId = new UserId(requestDto.userId);

    const user = await this.userRepository.getById(targetUserId);

    return new GetUserResponseDto(
      user.getUserId().value,
      user.getEmail().value,
      user.getUsername().value
    );
  }
}
