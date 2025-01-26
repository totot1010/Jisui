import { TokenService } from "../../application/auth/service/token.service";
import { User } from "../../domain/user/entity/user.entity";
import { IUserRepository } from "../../domain/user/repository/user.repository";
import { Email, HashedPassword, UserId, Username } from "../../domain/user/value_object";

export const createUser = async (userRepository: IUserRepository) => {
  const user = new User(
    UserId.generate(),
    new Username("test"),
    new Email("test@example.com"),
    new HashedPassword("password12341234")
  );
  await userRepository.create(user);
  return user;
};

export const createUserAndGetToken = async (userRepository: IUserRepository) => {
  const user = await createUser(userRepository);
  const tokenService = new TokenService();
  const { accessToken, refreshToken } = await tokenService.generateTokens(user.getUserId().value);
  return { user, accessToken, refreshToken };
};
