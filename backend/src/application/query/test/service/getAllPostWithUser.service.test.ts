import { describe, expect, it, vi } from "vitest";
import { PostFakeRepository } from "../../../../infrastructure/repository/post.fakeRepository";
import { UserFakeRepository } from "../../../../infrastructure/repository/user.fakeRepository";
import { PostQueryService } from "../../../post/service/postQuery.service";
import { UserQueryService } from "../../../user/service/userQuery.service";
import { GetAllPostWithUserService } from "../../service/getAllPostWithUser.service";
import { Post } from "../../../../domain/post/entity/post.entity";
import { User } from "../../../../domain/user/entity/user.entity";
import { PostId, Price, Title } from "../../../../domain/post/value_object";
import { Email, HashedPassword, UserId, Username } from "../../../../domain/user/value_object";


describe('GetAllPostWithUserService', () => {
  const postFakeRepository = new PostFakeRepository();
  const userFakeRepository = new UserFakeRepository();
  const postQueryService = new PostQueryService(postFakeRepository);
  const userQueryService = new UserQueryService(userFakeRepository);
  const getAllPostWithUserService = new GetAllPostWithUserService(postQueryService, userQueryService);

  describe('execute', async () => {
    it('全ての投稿が取得できること', async () => {
      // given
      // fakeRepositoryのreturnをmock化する
      postFakeRepository.findAll = vi.fn().mockResolvedValue([
        new Post(new PostId('id1'), new Title('title1'), new Price(100), new UserId('userId1'), new Date(), new Date(), []),
        new Post(new PostId('id2'), new Title('title2'), new Price(200), new UserId('userId2'), new Date(), new Date(), []),
      ]);

      userFakeRepository.findAll = vi.fn().mockResolvedValue([
        new User(new UserId('userId1'), new Username('username1'), new Email('email1@email.com'), new HashedPassword('password1')),
        new User(new UserId('userId2'), new Username('username2'), new Email('email2@email.com'), new HashedPassword('password2')),
      ]);

      // when
      const posts = await getAllPostWithUserService.execute(undefined);

      // then
      expect(posts).toHaveLength(2);
    });
  });
});
