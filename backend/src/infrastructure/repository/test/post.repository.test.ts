import bcrypt from 'bcrypt';

import { afterEach, describe, expect, it } from "vitest";
import { PostId, Price, Title } from "../../../domain/post/value_object";
import { UserId } from "../../../domain/user/value_object";
import { Post } from "../../../domain/post/entity/post.entity";
import { PostRepository } from "../post.repository";
import { prisma } from "../../prisma/prisma";
import { User } from '../../../domain/user/entity/user.entity';
import { UserRepository } from '../user.repository';
import { transactionTest } from './transactionTest';


describe('PostRepository', async () => {
  const postRepository = new PostRepository()
  const userRepository = new UserRepository()

  const userId = UserId.generate().value;
  const username = 'username';
  const email = 'aaa@aaa.com'
  const RawPassword = 'password';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(RawPassword, salt);
  const user = User.reConstruct(userId, username, email, hashedPassword);

  afterEach(async () => {
    const deletePosts = prisma.post.deleteMany()
    const deleteUsers = prisma.user.deleteMany()
    await prisma.$transaction([
      deletePosts,
      deleteUsers,
    ])

    await prisma.$disconnect()
  })

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
