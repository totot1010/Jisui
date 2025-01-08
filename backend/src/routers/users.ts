import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { CreateUserRequestDto } from "../application/user/dto/createUser.dto";
import { UserRepository } from "../infrastructure/repository/user.repository";
import { UserCreateService } from "../application/user/service/userCreate.service";
import { CheckUserDuplicationDomainService } from "../domain/user/service/checkUserDuplication.domainService";
import { UserDuplicationError } from "../domain/user/exceptions/userDuplicationError";
import { requiredAuth } from "./middleware";
import { UpdateUserRequestDto } from "../application/user/dto/updateUser.dto";
import { UserUpdateService } from "../application/user/service/userUpdate.service";
import { ValidationError } from "../shared/exceptions/validationError";
import { UserQueryService } from "../application/user/service/userQuery.service";
import { GetUserRequestDto, GetUserResponseDto } from "../application/user/dto/getUser.dto";
import { UserNotFoundError } from "../domain/user/exceptions/userNotFoundError";
import { HttpStatus } from "../shared/constants/statusCode";

// c.getで取得するパラメータの型
type Variables = {
  userId?: string
}

const user = new Hono<{ Variables: Variables }>().basePath("/users");
user.onError((error: any, c) => {
  if (error instanceof UserDuplicationError || error instanceof ValidationError) {
    return c.json({ message: String(error.message) }, HttpStatus.BAD_REQUEST);
  }
  if (error instanceof UserNotFoundError) {
    return c.json({ message: String(error.message) }, HttpStatus.NOT_FOUND);
  }
  if (error instanceof HTTPException) {
    return error.getResponse();
  }
  return c.json({ message: "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
});

const userRepository = new UserRepository();
const checkUserDuplicationDomainService = new CheckUserDuplicationDomainService(userRepository);

user.post("/", async (c) => {
  const userCreateService = new UserCreateService(userRepository, checkUserDuplicationDomainService);

  const body = await c.req.json();
  const { email, username, password } = body;
  const createUserRequestDto = new CreateUserRequestDto(email, username, password);

  const user = await userCreateService.create(createUserRequestDto);

  return c.json({
    userId: user.getUserId().value,
    email: user.getEmail().value,
    username: user.getUsername().value,
  }, HttpStatus.CREATED);
});

// ここから下は認証が必要
user.use(requiredAuth);

user.get("/:id", async (c) => {
  const id = c.req.param('id')
  const userQueryService = new UserQueryService(userRepository);
  const user: GetUserResponseDto = await userQueryService.getById(new GetUserRequestDto(id));

  return c.json(user, HttpStatus.OK);
});

user.put("/", async (c) => {
  const userId = c.get("userId");

  if (!userId) {
    // リクエストのユーザーが取得できなかった場合、基本はここは通らない
    return c.json({ message: "Invalid User" }, 401);
  }
  const body = await c.req.json();
  const { email, username, password, passwordConfirm } = body;
  const updateUserRequestDto = new UpdateUserRequestDto(userId, email, username, password, passwordConfirm);

  const userUpdateService = new UserUpdateService(userRepository, checkUserDuplicationDomainService);
  const user = await userUpdateService.update(updateUserRequestDto);

  return c.json({
    userId: user.getUserId().value,
    email: user.getEmail().value,
    username: user.getUsername().value,
  }, HttpStatus.OK);
});

user.delete("/", (c) => {
  return c.json({ message: "User deleted success" }, HttpStatus.OK);
});

export default user;
