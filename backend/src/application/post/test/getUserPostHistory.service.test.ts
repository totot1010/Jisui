import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetUserPostHistoryService } from '../service/getUserPostHistory.service';
import { PostQueryService } from '../service/postQuery.service';
import { Post } from '../../../domain/post/entity/post.entity';
import { getUserPostHistoryResponseDto } from '../dto/getUserPostHistory.dto';
import { PostId, Price, Title } from '../../../domain/post/value_object';
import { UserId } from '../../../domain/user/value_object';

// PostQueryServiceのモック
vi.mock('../postQuery.service');

describe('GetUserPostHistoryService', () => {
  let getUserPostHistoryService: GetUserPostHistoryService;
  let postQueryService: PostQueryService;

  beforeEach(() => {
    postQueryService = new PostQueryService({} as any);
    getUserPostHistoryService = new GetUserPostHistoryService(postQueryService);
  });

  describe('execute', () => {
    it('指定された期間の投稿履歴を正しく取得できること', async () => {
      // given
      const userId = 'test-user-id';
      const startDate = new Date('2024-03-01');
      const endDate = new Date('2024-03-03');

      const mockPosts = [
        new Post(
          new PostId('post-1'),
          new Title('Test Post 1'),
          new Price(1000),
          new UserId(userId),
          new Date('2024-03-01T10:00:00Z'),
          new Date('2024-03-01T10:00:00Z'),
          [],
          []
        ),
        new Post(
          new PostId('post-2'),
          new Title('Test Post 2'),
          new Price(2000),
          new UserId(userId),
          new Date('2024-03-02T15:00:00Z'),
          new Date('2024-03-02T15:00:00Z'),
          [],
          []
        ),
      ];

      vi.spyOn(postQueryService, 'findAll').mockResolvedValue(mockPosts);

      // when
      const result = await getUserPostHistoryService.execute(userId, startDate, endDate);

      // then
      expect(result.userPostHistory).toHaveLength(3); // 3日分のデータ
      const postCounts = result.userPostHistory.map(history => ({
        date: history.date.toISOString().split('T')[0],
        count: history.count
      }));

      expect(postCounts).toEqual([
        { date: '2024-03-01', count: 1 },
        { date: '2024-03-02', count: 1 },
        { date: '2024-03-03', count: 0 }
      ]);

      expect(postQueryService.findAll).toHaveBeenCalledWith(userId, startDate, endDate);
      expect(postQueryService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
