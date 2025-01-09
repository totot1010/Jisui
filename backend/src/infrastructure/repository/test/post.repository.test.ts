import bcrypt from 'bcrypt';

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PostId, Price, Title } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";
import { Post } from "../../../domain/post/entity/post.entity";
import { PostRepository } from "../post.repository";
import { prisma } from "../../prisma/prisma";
import { User } from '../../../domain/user/entity/user.entity';
import { UserRepository } from '../user.repository';
import { transactionTest } from './transactionTest';
import { Like } from '../../../domain/post/entity/like.entity';


describe('PostRepository', async () => {
  const postRepository = new PostRepository()
  const userRepository = new UserRepository()

  const salt = await bcrypt.genSalt(10);

  const userId = UserId.generate().value;
  const username = 'username';
  const email = 'aaa@aaa.com'
  const RawPassword = 'password';
  const hashedPassword = await bcrypt.hash(RawPassword, salt);
  const user = User.reConstruct(userId, username, email, hashedPassword);

  const userId2 = UserId.generate().value;
  const username2 = 'username2';
  const email2 = 'bbb@bbb.com'
  const RawPassword2 = 'password';
  const hashedPassword2 = await bcrypt.hash(RawPassword2, salt);
  const user2 = User.reConstruct(userId2, username2, email2, hashedPassword2);

  afterEach(async () => {
    const deletePosts = prisma.post.deleteMany()
    const deleteUsers = prisma.user.deleteMany()
    await prisma.$transaction([
      deletePosts,
      deleteUsers,
    ])

    await prisma.$disconnect()
  })

  describe('findAll', () => {
    it('全ての投稿を取得できること', transactionTest(async () => {
      // given
      await userRepository.create(user);

      const postId = PostId.generate();
      const title = new Title('title');
      const price = new Price(1000);
      const userId = user.getUserId();
      const createAt = new Date();
      const updatedAt = new Date();
      const post = new Post(postId, title, price, userId, createAt, updatedAt);

      const postId2 = PostId.generate();
      const title2 = new Title('title2');
      const price2 = new Price(2000);
      const userId2 = user.getUserId();
      const createAt2 = new Date();
      const updatedAt2 = new Date();
      const post2 = new Post(postId2, title2, price2, userId2, createAt2, updatedAt2);

      await postRepository.create(post);
      await postRepository.create(post2);

      // when
      const results = await postRepository.findAll();
      const [result2, result1] = results;

      // then
      expect(results).toHaveLength(2);
      expect(result1.getPostId().value).toBe(postId.value);
      expect(result1.getTitle().value).toBe(title.value);
      expect(result1.getPrice().value).toBe(price.value);
      expect(result1.getUserId().value).toBe(userId.value);
      expect(result2.getPostId().value).toBe(postId2.value);
      expect(result2.getTitle().value).toBe(title2.value);
      expect(result2.getPrice().value).toBe(price2.value);
      expect(result2.getUserId().value).toBe(userId2.value);
    }));
  });

  describe('countByUserIdAndType', () => {
    beforeEach(() => {
      // 時間をモック化
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('ユーザーIDとタイプに基づいて投稿のカウントを取得できること', transactionTest(async () => {
      // given
      await userRepository.create(user);
      const post1 = new Post(PostId.generate(), new Title('title1'), new Price(100), user.getUserId(), new Date(), new Date());
      const post2 = new Post(PostId.generate(), new Title('title2'), new Price(200), user.getUserId(), new Date(), new Date());

      await postRepository.create(post1);
      await postRepository.create(post2);

      // モック化した日付を設定
      vi.setSystemTime(new Date('2023-01-01'));

      // when
      const countDay = await postRepository.countByUserIdAndType(user.getUserId(), 'day');
      const countWeek = await postRepository.countByUserIdAndType(user.getUserId(), 'week');

      // then
      expect(countDay).toBe(2);
      expect(countWeek).toBe(2);
    }));
  });

  describe('existsLikeByUserAndPost', () => {
    it('ある投稿への同一ユーザーのいいねがある場合、Trueが返ってくること', transactionTest(async () => {
      // given
      await userRepository.create(user);

      const postId = PostId.generate();
      const title = new Title('title');
      const price = new Price(1000);
      const userId = user.getUserId();
      const createAt = new Date();
      const updatedAt = new Date();
      const post = new Post(postId, title, price, userId, createAt, updatedAt);

      await postRepository.create(post);
      const like = new Like(userId, postId);
      await postRepository.createLike(like);

      // when
      const result = await postRepository.existsLikeByUserAndPost(like);

      // then
      expect(result).toBeTruthy();
    }));

    it('ユーザーが投稿にいいねしていない場合、Falseが返ってくること', transactionTest(async () => {
      // given
      await userRepository.create(user);

      const postId = PostId.generate();
      const title = new Title('title');
      const price = new Price(1000);
      const userId = user.getUserId();
      const createAt = new Date();
      const updatedAt = new Date();
      const post = new Post(postId, title, price, userId, createAt, updatedAt);

      await postRepository.create(post);
      const like = new Like(userId, postId);

      // when
      const result = await postRepository.existsLikeByUserAndPost(like);

      // then
      expect(result).toBeFalsy();
    }));
  });

  describe('createLike', () => {
    it('投稿にいいねをすることができること', transactionTest(async () => {
      // given
      await userRepository.create(user);
      await userRepository.create(user2);

      const postId = PostId.generate();
      const title = new Title('title');
      const price = new Price(1000);
      const userId = user.getUserId();
      const createAt = new Date();
      const updatedAt = new Date();
      const post = new Post(postId, title, price, userId, createAt, updatedAt);

      const postId2 = PostId.generate();
      const title2 = new Title('title2');
      const price2 = new Price(2000);
      const userId2 = user2.getUserId();
      const createAt2 = new Date();
      const updatedAt2 = new Date();
      const post2 = new Post(postId2, title2, price2, userId2, createAt2, updatedAt2);

      await postRepository.create(post);
      await postRepository.create(post2);

      // when
      const like1 = new Like(userId, postId);
      await postRepository.createLike(like1);
      const like2 = new Like(userId, postId2);
      await postRepository.createLike(like2);

      // then
      const result = await postRepository.existsLikeByUserAndPost(like1);
      expect(result).toBeTruthy();
      const result2 = await postRepository.existsLikeByUserAndPost(like2);
      expect(result2).toBeTruthy();
    }));

    describe('deleteLike', () => {
      it('投稿へのいいねを外すことができること', transactionTest(async () => {
        // given
        await userRepository.create(user);
        await userRepository.create(user2);

        const postId = PostId.generate();
        const title = new Title('title');
        const price = new Price(1000);
        const userId = user.getUserId();
        const createAt = new Date();
        const updatedAt = new Date();
        const post = new Post(postId, title, price, userId, createAt, updatedAt);

        const postId2 = PostId.generate();
        const title2 = new Title('title2');
        const price2 = new Price(2000);
        const userId2 = user2.getUserId();
        const createAt2 = new Date();
        const updatedAt2 = new Date();
        const post2 = new Post(postId2, title2, price2, userId2, createAt2, updatedAt2);

        await postRepository.create(post);
        await postRepository.create(post2);

        const like1 = new Like(userId, postId);
        await postRepository.createLike(like1);
        const like2 = new Like(userId, postId2);
        await postRepository.createLike(like2);

        // when
        await postRepository.deleteLike(like1);
        await postRepository.deleteLike(like2);

        // then
        const result = await postRepository.existsLikeByUserAndPost(like1);
        expect(result).toBeFalsy();
        const result2 = await postRepository.existsLikeByUserAndPost(like2);
        expect(result2).toBeFalsy();
      }));
    });
  });
});
