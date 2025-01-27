import { describe, expect, it } from "vitest";
import user from "../users";
import { transactionTest } from "../../infrastructure/repository/test/transactionTest";
import { UserRepository } from "../../infrastructure/repository/user.repository";
import { createUserAndGetToken } from "./authTestHelpers";

describe("users", () => {
  describe("POST /users", () => {
    it("ユーザーが作成され、201が返却されること", transactionTest(async () => {
      const response = await user.request("/users", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.com",
          username: "test",
          password: "password12341234",
        })
      });

      expect(response.status).toBe(201);
      expect(await response.json()).toEqual({
        userId: expect.any(String),
        email: "test@example.com",
        username: "test",
      });
    }));
  });

  describe("GET /users/:id", () => {
    it("認証済みユーザーが存在するユーザーを取得すると、200が返却されること", transactionTest(async () => {
      const userRepository = new UserRepository();
      const { user: createdUser, accessToken } = await createUserAndGetToken(userRepository);

      const response = await user.request(`/users/${createdUser.getUserId().value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        userId: createdUser.getUserId().value,
        email: createdUser.getEmail().value,
        username: createdUser.getUsername().value,
      });
    }));
  });

  describe("PUT /users", () => {
    it("認証済みユーザーが自身の情報を更新すると、200が返却されること", transactionTest(async () => {
      const userRepository = new UserRepository();
      const { user: createdUser, accessToken } = await createUserAndGetToken(userRepository);

      const response = await user.request("/users", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          email: "updated@example.com",
          username: "updated",
          password: "newpassword12341234",
          passwordConfirm: "newpassword12341234"
        })
      });

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        userId: createdUser.getUserId().value,
        email: "updated@example.com",
        username: "updated"
      });
    }));
  });
});
