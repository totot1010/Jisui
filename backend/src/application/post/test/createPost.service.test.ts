import { describe, it, expect, beforeEach } from 'vitest';
import { CreatePostService } from '../service/createPost.service';
import { PostFakeRepository } from '../../../infrastructure/repository/post.fakeRepository';
import { CreatePostRequestDto } from '../dto/createPost.dto';
import { v4 as uuidv4 } from 'uuid';

describe('CreatePostService', () => {
  const createPostService = new CreatePostService(new PostFakeRepository());
  it('正常に投稿を作成できること', async () => {
    const validUserId = uuidv4();
    const createPostDto: CreatePostRequestDto = {
      title: 'テスト投稿',
      price: 1000,
      userId: validUserId
    };

    const result = await createPostService.execute(createPostDto);

    expect(result).toBeDefined();
    expect(result.title).toBe(createPostDto.title);
    expect(result.price).toBe(createPostDto.price);
    expect(result.userId).toBe(createPostDto.userId);
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });

  it('タイトルが空の場合にエラーが発生すること', async () => {
    const validUserId = uuidv4();
    const createPostDto: CreatePostRequestDto = {
      title: '',
      price: 1000,
      userId: validUserId
    };

    await expect(createPostService.execute(createPostDto)).rejects.toThrow();
  });

  it('価格が負の場合にエラーが発生すること', async () => {
    const validUserId = uuidv4();
    const createPostDto: CreatePostRequestDto = {
      title: 'テスト投稿',
      price: -1000,
      userId: validUserId
    };

    await expect(createPostService.execute(createPostDto)).rejects.toThrow();
  });
});