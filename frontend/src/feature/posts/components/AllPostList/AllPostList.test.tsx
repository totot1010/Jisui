import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Post } from '../../types';
import { AllPostList } from './AllPostList';
import * as apiMock from '@/api/api';

const post: Post = {
  postId: '1',
  title: 'title',
  price: 1000,
  userId: '1',
  username: 'username',
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: ["id"],
  comments: [],
};

const spy = vi.spyOn(apiMock, 'ApiClient').mockReturnValue({
  Get: vi.fn().mockResolvedValue({ type: 'success', data: [post] }),
  Post: vi.fn(),
  Put: vi.fn(),
  Delete: vi.fn(),
});

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockReturnValue({
    get: vi.fn().mockReturnValue({
      value: 'userId',
    }),
  }),
}));  

describe('AllPostList', () => {

  it('投稿取得APIが呼ばれること', async () => {
    render(<AllPostList userId={undefined} />);

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
});
