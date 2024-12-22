import { Hono } from "hono";
import { UserRepository } from "../infrastructure/repository/user.repository";
import { TokenService } from "../application/auth/service/token.service";
import { LoginService } from "../application/auth/service/login.service";
import { LoginRequestDto } from "../application/auth/dto/login.dto";

const auth = new Hono();

const userRepository = new UserRepository();

const tokenService = new TokenService();
const loginService = new LoginService(userRepository, tokenService);


auth.post("/login", async (c) => {
  const body = await c.req.json();
  const { email, password } = body;

  const loginRequestDto = new LoginRequestDto(email, password);

  const loginResponse = await loginService.login(loginRequestDto);
  return c.json(loginResponse, 200);
})
  .onError((error: any, c) => {
    if (error instanceof Error) {
      console.error(error);
      return c.json({ message: "ログインに失敗しました" }, 400);
    }
    return c.json({ message: "" }, 500);
  });

auth.post("/logout", (c) => {
  return c.json({ message: "Logout success" }, 200);
});


export default auth;
