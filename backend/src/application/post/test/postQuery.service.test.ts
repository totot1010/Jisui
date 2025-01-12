import { describe, expect, it, vi } from "vitest";
import { PostQueryService } from "../service/postQuery.service";
import { PostFakeRepository } from "../../../infrastructure/repository/post.fakeRepository";
import { UserId } from "../../../domain/user/value_object";

describe('PostQueryService', () => {
  const postFakeRepository = new PostFakeRepository();
  const postQueryService = new PostQueryService(postFakeRepository);

  describe('findAll', async () => {
    it('全ての投稿が取得できること', async () => {
      // when
      const posts = await postQueryService.findAll();

      const [post1, post2] = posts;
      // then
      expect(posts).toHaveLength(2);
      expect(post1.getTitle().value).toBe('title1');
      expect(post2.getTitle().value).toBe('title2');
      expect(post1.getPrice().value).toBe(100);
      expect(post2.getPrice().value).toBe(200);
      expect(post1.getUserId().value).toBe('userId1');
      expect(post2.getUserId().value).toBe('userId2');
      expect(post1.getCreatedAt()).toBeInstanceOf(Date);
      expect(post2.getCreatedAt()).toBeInstanceOf(Date);
      expect(post1.getUpdatedAt()).toBeInstanceOf(Date);
      expect(post2.getUpdatedAt()).toBeInstanceOf(Date);

      expect(post1.getPostId().value).toBe('id1');
      expect(post2.getPostId().value).toBe('id2');
      expect(post1.getTitle().value).toBe('title1');
      expect(post2.getTitle().value).toBe('title2');
      expect(post1.getPrice().value).toBe(100);
      expect(post2.getPrice().value).toBe(200);
      expect(post1.getUserId().value).toBe('userId1');
      expect(post2.getUserId().value).toBe('userId2');
    });
  });

  describe('countByUserIdAndType', () => {
    it('ユーザーIDとタイプに基づいて投稿のカウントを取得できること', async () => {
      // given
      postFakeRepository.countByUserIdAndType = vi.fn().mockResolvedValue(2);
      const userId = UserId.generate();
      // when
      const countDay = await postQueryService.countByUserIdAndType(userId.value, 'day');

      // then
      expect(countDay).toBe(2);
    });
  });
});
