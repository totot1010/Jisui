import { describe, expect, it } from "vitest";
import { UserFakeRepository } from "../../../../infrastructure/repository/user.fakeRepository";
import { UserQueryService } from "../../service/userQuery.service";

describe('UserQueryService', () => {
  const userFakeRepository = new UserFakeRepository()
  const userQueryService = new UserQueryService(userFakeRepository);

  describe('findAll', async () => {
    it('全てのユーザーが取得できること', async () => {
      // when
      const users = await userQueryService.findAll();

      const [user1, user2] = users;
      // then
      expect(users).toHaveLength(2);
      expect(user1.getUsername().value).toBe('user1');
      expect(user1.getEmail().value).toBe('aaa@aaa.com');
      expect(user2.getUsername().value).toBe('user2');
      expect(user2.getEmail().value).toBe('bbb@bbb.com');
    })
  });

  describe('getById', async () => {
    it('指定したユーザーが取得できること', async () => {
      // given
      const requestDto = {
        userId: 'userId'
      }

      // when
      const user = await userQueryService.getById(requestDto);

      // then
      expect(user).toBeDefined();
    })
  });
})
