import bcrypt from 'bcrypt';

import { describe, it, expect, afterEach } from 'vitest';
import { UserRepository } from '../user.repository';
import { User } from '../../../domain/user/entity/user.entity';
import { prisma } from '../../prisma/prisma';
import { Email, UserId } from '../../../domain/user/value_object';
import { transactionTest } from './transactionTest';


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

  describe('create', async () => {
    it('ユーザーが作成できること', transactionTest(async () => {
      // given
      const user = User.reConstruct(userId, username, email, hashedPassword);

      // when
      const result = await userRepository.create(user);

      // then
      expect(result).toBeTruthy();
    }));
  });

  describe('findByEmail', async () => {
    it('emailでユーザーを取得できること', transactionTest(async () => {
      // given
      const user = User.reConstruct(userId, username, email, hashedPassword);
      await userRepository.create(user);

      // when
      const result = await userRepository.findByEmail(new Email(email));

      // then
      expect(result).toBeTruthy();

    }));
  });

  describe('findById', async () => {
    it('idでユーザーを取得できること', transactionTest(async () => {
      // given
      const user = User.reConstruct(userId, username, email, hashedPassword);
      await userRepository.create(user);


      // when
      const result = await userRepository.findById(new UserId(userId));

      // then
      expect(result).toBeTruthy();
    }));
  });

  describe('findAll', async () => {
    it('全ユーザーを取得できること', transactionTest(async () => {
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
    }));
  });

  describe('getById', async () => {
    it('idでユーザーを取得できること', transactionTest(async () => {
      // given
      const user = User.reConstruct(userId, username, email, hashedPassword);
      await userRepository.create(user);

      // when
      const result = await userRepository.getById(new UserId(userId));

      // then
      expect(result).toBeTruthy();
    }));

    it('idが存在しない場合、エラーが発生すること', transactionTest(async () => {
      // given
      const user = User.reConstruct(userId, username, email, hashedPassword);
      await userRepository.create(user);

      // when
      const result = userRepository.getById(new UserId('notExistId'));

      // then
      await expect(result).rejects.toThrowError();
    }));
  });

  describe('update', async () => {
    it('ユーザーが更新できること', transactionTest(async () => {
      // given
      const user = User.reConstruct(userId, username, email, hashedPassword);
      await userRepository.create(user);

      const newEmail = 'email@email.com';
      const newUsername = 'newUsername';
      const newPassword = 'newPassword';
      const newSalt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, newSalt);
      const newUser = User.reConstruct(userId, newUsername, newEmail, newHashedPassword);

      // when
      const result = await userRepository.update(newUser);

      // then
      expect(result.getEmail().value).toBe(newEmail);
      expect(result.getUsername().value).toBe(newUsername);
      expect(result.getHashedPassword().value).toBe(newHashedPassword);
    }));
  });
});
