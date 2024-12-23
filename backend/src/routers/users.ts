import { Hono } from "hono";
import { CreateUserRequestDto } from "../application/user/dto/createUser.dto";
import { UserRepository } from "../infrastructure/repository/user.repository";
import { UserCreateService } from "../application/user/service/userCreate.service";
import { CheckUserDuplicationDomainService } from "../domain/user/service/checkUserDuplication.domainService";
import { UserDuplicationError } from "../domain/user/exceptions/userDuplicationError";

const user = new Hono().basePath("/users");
user.onError((error: any, c) => {
  if (error instanceof UserDuplicationError) {
    return c.json({ message: error.message }, 400);
  }
  return c.json({ message: error.message }, 500);
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

user.get("/:id", (c) => {
  const id = c.req.param('id')

  return c.json({ message: `User with id ${id}` }, 200);
});

user.put("/", (c) => {
  return c.json({ message: "User updated success" }, 200);
});

user.delete("/", (c) => {
  return c.json({ message: "User deleted success" }, 200);
});

export default user;
