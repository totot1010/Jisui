import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Post } from '../../types';
import { CreateCommentForm } from './CreateCommentForm';
import * as createCommentModule from '@/feature/posts/actions/createComment';
import { toast } from '@/hooks/use-toast';
import { act } from 'react';

const post: Post = {
  postId: '1',
  title: 'title',
  price: 1000,
  userId: 'id1',
  username: 'username',
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: [],
  comments: [],
};

const createCommentSpy = vi.spyOn(createCommentModule, 'createComment').mockResolvedValue(undefined);

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn().mockResolvedValue(undefined),
}));

describe('CreateCommentForm', () => {
  it('コメントフォームが表示されること', () => {
    render(<CreateCommentForm post={post} />);

    expect(screen.getByPlaceholderText('コメントを追加...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '投稿' })).toBeInTheDocument();
  });

  it('コメントを入力できること', () => {
    render(<CreateCommentForm post={post} />);

    const input = screen.getByPlaceholderText('コメントを追加...') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: 'テストコメント' } });
    })

    expect(input.value).toBe('テストコメント');
  });

  it('空のコメントは送信されないこと', async () => {
    render(<CreateCommentForm post={post} />);

    const button = screen.getByRole('button', { name: '投稿' });
    act(() => {
      fireEvent.click(button);
    })

    expect(createCommentSpy).not.toHaveBeenCalled();
  });

  it('コメントが正常に送信されること', async () => {
    render(<CreateCommentForm post={post} />);

    const input = screen.getByPlaceholderText('コメントを追加...');
    const button = screen.getByRole('button', { name: '投稿' });
    act(() => {
      fireEvent.change(input, { target: { value: 'テストコメント' } });
      fireEvent.click(button);
    })

    await waitFor(() => {
      expect(createCommentSpy).toHaveBeenCalledWith({
        postId: post.postId,
        content: 'テストコメント'
      });
    })
  });

  it('コメント送信中はフォームが無効化されること', async () => {
    createCommentSpy.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<CreateCommentForm post={post} />);

    const input = screen.getByPlaceholderText('コメントを追加...') as HTMLInputElement;
    const button = screen.getByRole('button', { name: '投稿' });

    act(() => {
      fireEvent.change(input, { target: { value: 'テストコメント' } });
      fireEvent.click(button);
    })

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('コメント送信に失敗した場合、エラーメッセージが表示されること', async () => {
    createCommentSpy.mockResolvedValue({
      type: 'error',
      status: '400',
      title: 'API Error',
      message: 'コメントの投稿に失敗しました。',
    });

    render(<CreateCommentForm post={post} />);

    const input = screen.getByPlaceholderText('コメントを追加...');
    const button = screen.getByRole('button', { name: '投稿' });

    act(() => {
      fireEvent.change(input, { target: { value: 'テストコメント' } });
      fireEvent.click(button);
    })

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: '予期せぬエラーが発生しました。',
        description: 'コメントの投稿に失敗しました。',
      });
    });
  });
});