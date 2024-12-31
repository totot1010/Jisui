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

// c.getで取得するパラメータの型
type Variables = {
  userId?: string
}

const user = new Hono<{ Variables: Variables }>().basePath("/users");
user.onError((error: any, c) => {
  if (error instanceof UserDuplicationError) {
    return c.json({ message: error.message }, 400);
  }
  if (error instanceof HTTPException) {
    return error.getResponse();
  }
  return c.json({ message: "Internal Server Error" }, 500);
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
    message: "User created success",
    data: {
      id: user.getUserId().value,
      email: user.getEmail().value,
      username: user.getUsername().value,
    }
  }, 200);
});

// ここから下は認証が必要
user.use(requiredAuth);

user.get("/:id", (c) => {
  const id = c.req.param('id')

  return c.json({ message: `User with id ${id}` }, 200);
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
  const userRepository = new UserRepository();
  const checkUserDuplicationDomainService = new CheckUserDuplicationDomainService(userRepository);

  const userUpdateService = new UserUpdateService(userRepository, checkUserDuplicationDomainService);
  const user = await userUpdateService.update(updateUserRequestDto);

  return c.json({
    message: "User updated success",
    data: {
      id: user.getUserId().value,
      email: user.getEmail().value,
      username: user.getUsername().value,
    }
  }, 200);
});

user.delete("/", (c) => {
  return c.json({ message: "User deleted success" }, 200);
});

export default user;
