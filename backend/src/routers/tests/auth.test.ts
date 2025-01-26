import { describe, expect, it } from "vitest";
import auth from "../auth";
import { transactionTest } from "../../infrastructure/repository/test/transactionTest";
import { UserRepository } from "../../infrastructure/repository/user.repository";
import { UserCreateService } from "../../application/user/service/userCreate.service";
import { CheckUserDuplicationDomainService } from "../../domain/user/service/checkUserDuplication.domainService";
import { CreateUserRequestDto } from "../../application/user/dto/createUser.dto";

describe("auth", () => {
  describe("POST /auth/login", () => {
    it("正しい認証情報でログインが成功し、200が返却されること", transactionTest(async () => {
      // テストユーザーを作成
      const userRepository = new UserRepository();
      const checkUserDuplicationDomainService = new CheckUserDuplicationDomainService(userRepository);
      const userCreateService = new UserCreateService(userRepository, checkUserDuplicationDomainService);

      const createUserDto = new CreateUserRequestDto(
        "test@example.com",
        "test",
        "password12341234"
      );
      await userCreateService.create(createUserDto);

      const response = await auth.request("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password12341234"
        })
      });

      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
        userId: expect.any(String),
        username: "test"
      });
    }));
  });

  describe("POST /auth/refresh", () => {
    it("有効なリフレッシュトークンで新しいアクセストークンが取得でき、200が返却されること", transactionTest(async () => {
      // テストユーザーを作成
      const userRepository = new UserRepository();
      const checkUserDuplicationDomainService = new CheckUserDuplicationDomainService(userRepository);
      const userCreateService = new UserCreateService(userRepository, checkUserDuplicationDomainService);

      const createUserDto = new CreateUserRequestDto(
        "test@example.com",
        "test",
        "password12341234"
      );
      await userCreateService.create(createUserDto);

      // ログインしてリフレッシュトークンを取得
      const loginResponse = await auth.request("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          password: "password12341234"
        })
      });
      const { refreshToken } = await loginResponse.json();

      const response = await auth.request("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({
          refreshToken: refreshToken
        })
      });

      expect(response.status).toBe(200);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        accessToken: expect.any(String)
      });
    }));
  });
});
