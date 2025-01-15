import { describe, expect, it, vi } from "vitest";
import { PostFakeRepository } from "../../../../infrastructure/repository/post.fakeRepository";
import { UserFakeRepository } from "../../../../infrastructure/repository/user.fakeRepository";
import { PostQueryService } from "../../../post/service/postQuery.service";
import { UserQueryService } from "../../../user/service/userQuery.service";
import { Post } from "../../../../domain/post/entity/post.entity";
import { User } from "../../../../domain/user/entity/user.entity";
import { PostId, Price, Title } from "../../../../domain/post/value_object";
import { Email, HashedPassword, UserId, Username } from "../../../../domain/user/value_object";
import { GetUserPostService } from "../../service/getUserPost.service";
import { GetUserPostRequestDto } from "../../dto/getUserPost.dto";


describe('GetUserPostService', () => {
  const postFakeRepository = new PostFakeRepository();
  const userFakeRepository = new UserFakeRepository();
  const postQueryService = new PostQueryService(postFakeRepository);
  const userQueryService = new UserQueryService(userFakeRepository);
  const getUserPostService = new GetUserPostService(postQueryService, userQueryService);

  describe('execute', async () => {
    it('ユーザーIDに紐づく全ての投稿が取得できること', async () => {
      // given
      postFakeRepository.findAllByUserId = vi.fn().mockResolvedValue([
        new Post(new PostId('id1'), new Title('title1'), new Price(100), new UserId('userId1'), new Date(), new Date(), []),
      ]);

      userFakeRepository.findAll = vi.fn().mockResolvedValue([
        new User(new UserId('userId1'), new Username('username1'), new Email('email1@email.com'), new HashedPassword('password1')),
        new User(new UserId('userId2'), new Username('username2'), new Email('email2@email.com'), new HashedPassword('password2')),
      ]);

      // when
      const getUserPostRequestDto = new GetUserPostRequestDto('userId1');
      const posts = await getUserPostService.execute(getUserPostRequestDto);
      const [post1] = posts;

      // then
      expect(posts).toHaveLength(1);
      expect(post1.postId).toBe('id1');
      expect(post1.title).toBe('title1');
      expect(post1.price).toBe(100);
      expect(post1.userId).toBe('userId1');
      expect(post1.username).toBe('username1');
      expect(post1.likes).toEqual([]);
      expect(post1.comments).toEqual([]);
    });
  });
});
