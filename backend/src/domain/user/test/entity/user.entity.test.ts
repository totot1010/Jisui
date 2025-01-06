import { describe, expect, it } from "vitest";
import { Email, HashedPassword, RawPassword, UserId, Username } from "../../value_object";
import { User } from "../../entity/user.entity";

describe("UserEntity", () => {
  it("インスタンスが生成できること", async () => {
    // given
    const userId = UserId.generate();
    const username = new Username("username");
    const email = new Email("aaa@aaa.com")
    const rawPassword = new RawPassword("password1234");
    const hashedPassword = await HashedPassword.hash(rawPassword);

    // when
    const user = new User(userId, username, email, hashedPassword);

    // then
    expect(user.getUserId().value).toBe(userId.value);
    expect(user.getUsername().value).toBe(username.value);
    expect(user.getEmail().value).toBe(email.value);
    expect(user.getHashedPassword().value).toBe(hashedPassword.value);
  })

  it("永続化層から取得したデータをエンティティに変換できること", () => {
    // given
    const userIdValue = "1234-5678-9012";
    const usernameValue = "username";
    const emailValue = "aaa@aaa.com"
    const hashedPasswordValue = "$2b$10$CYCfNGgyGjVv3YIBfI5BK.WL.oYjUO.6lBFMdfaNskB1AjYQecWjm";

    // when
    const user = User.reConstruct(userIdValue, usernameValue, emailValue, hashedPasswordValue);

    // then
    expect(user.getUserId().value).toBe(userIdValue);
    expect(user.getUsername().value).toBe(usernameValue);
    expect(user.getEmail().value).toBe(emailValue);
    expect(user.getHashedPassword().value).toBe(hashedPasswordValue);
  })
});
