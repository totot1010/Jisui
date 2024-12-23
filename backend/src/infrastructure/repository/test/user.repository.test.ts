import bcrypt from 'bcrypt';

import { describe, it, expect, afterEach } from 'vitest';
import { UserRepository } from '../user.repository';
import { User } from '../../../domain/user/entity/user.entity';
import { prisma } from '../../prisma/prisma';
import { Email, UserId } from '../../../domain/user/value_object';


describe('userRepository', async () => {
  const userRepository = new UserRepository()

  const userId = UserId.generate().value;
  const username = 'username';
  const email = 'aaa@aaa.com'
  const RawPassword = 'password';
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(RawPassword, salt);

  afterEach(async () => {
    const deletePosts = prisma.post.deleteMany()
    const deleteUsers = prisma.user.deleteMany()
    await prisma.$transaction([
      deletePosts,
      deleteUsers,
    ])

    await prisma.$disconnect()
  })


  it('ユーザーが作成できること', async () => {
    // given
    const user = User.reConstruct(userId, username, email, hashedPassword);

    // when
    const result = await userRepository.create(user);

    // then
    expect(result).toBeTruthy();
  });

  it('emailでユーザーを取得できること', async () => {
    // given
    const user = User.reConstruct(userId, username, email, hashedPassword);
    await userRepository.create(user);

    // when
    const result = await userRepository.findByEmail(new Email(email));

    // then
    expect(result).toBeTruthy();

  })

  it('idでユーザーを取得できること', async () => {
    // given
    const user = User.reConstruct(userId, username, email, hashedPassword);
    await userRepository.create(user);


    // when
    const result = await userRepository.findById(new UserId(userId));

    // then
    expect(result).toBeTruthy();
  })

  it('全ユーザーを取得できること', async () => {
    // given
    const user = User.reConstruct(userId, username, email, hashedPassword);

    const userId2 = UserId.generate().value;
    const username2 = 'bbb'
    const email2 = 'bbb@bbb.com'
    const hashedPassword2 = await bcrypt.hash('password2', salt);
    const user2 = User.reConstruct(userId2, username2, email2, hashedPassword2);

    await userRepository.create(user);
    await userRepository.create(user2);

    // when
    const result = await userRepository.findAll();

    const [result1, result2] = result;
    // then
    expect(result).toHaveLength(2);
    expect(result1.getUserId().value).toBe(userId);
    expect(result1.getUsername().value).toBe(username);
    expect(result1.getEmail().value).toBe(email);
    expect(result1.getHashedPassword().value).toBe(hashedPassword);
    expect(result2.getUserId().value).toBe(userId2);
    expect(result2.getUsername().value).toBe(username2);
    expect(result2.getEmail().value).toBe(email2);
    expect(result2.getHashedPassword().value).toBe(hashedPassword2);
  })
});
