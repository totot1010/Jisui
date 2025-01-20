import { describe, expect, it } from "vitest";
import user from "../users";
import { transactionTest } from "../../infrastructure/repository/test/transactionTest";
import { UserRepository } from "../../infrastructure/repository/user.repository";
import { Email } from "../../domain/user/value_object";


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

      const dbUser = await new UserRepository().findByEmail(new Email("test@example.com"));
      expect(dbUser).not.toBeNull();
    }));
  });
});
