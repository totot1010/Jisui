import { describe, it, expect, beforeEach, vi } from 'vitest';
import post from '../posts';
import { createUserAndGetToken } from './authTestHelpers';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { transactionTest } from '../../infrastructure/repository/test/transactionTest';


describe("posts", () => {
  describe('GET /posts/users/:userId/history', () => {
    it('正常系: ユーザーの投稿履歴を取得できること', transactionTest(async () => {
      const userRepository = new UserRepository();
      const { user: createdUser, accessToken } = await createUserAndGetToken(userRepository);

      // テスト用の日付範囲を設定
      const endDate = new Date('2024-03-20');
      const startDate = new Date('2024-03-19');

      // リクエストの実行
      const res = await post.request('/posts/users/' + createdUser.getUserId().value + '/history?' +
        `startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // レスポンスの検証
      expect(res.status).toBe(200);
      const data = await res.json();

      // 2日分の投稿履歴を取得できていること
      expect(data.userPostHistory).toHaveLength(2);

      // 各日付のデータ構造を検証
      data.userPostHistory.forEach((history: any) => {
        expect(history).toHaveProperty('date');
        expect(history).toHaveProperty('count');
        expect(typeof history.count).toBe('number');
        expect(history.count).toBe(0);
        const historyDate = new Date(history.date);
        expect(historyDate >= startDate && historyDate <= endDate).toBe(true);
      });
    }));
  });
});
