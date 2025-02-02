import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreatePostDialog } from './CreatePostDialog';
import * as createPostModule from '@/feature/posts/actions/createPost';
import { toast } from '@/hooks/use-toast';
import { act } from 'react';

const createPostSpy = vi.spyOn(createPostModule, 'createPost').mockResolvedValue(undefined);

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn().mockResolvedValue(undefined),
}));

describe('CreatePostDialog', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('投稿ダイアログが表示されること', () => {
    render(<CreatePostDialog open={true} onClose={mockOnClose} />);

    expect(screen.getByLabelText('料理名')).toBeInTheDocument();
    expect(screen.getByLabelText('料金（円）')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /投稿する/ })).toBeInTheDocument();
  });

  it('料理名と料金を入力できること', () => {
    render(<CreatePostDialog open={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText('料理名') as HTMLInputElement;
    const priceInput = screen.getByLabelText('料金（円）') as HTMLInputElement;

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'テスト料理' } });
      fireEvent.change(priceInput, { target: { value: '1000' } });
    });

    expect(titleInput.value).toBe('テスト料理');
    expect(priceInput.value).toBe('1000');
  });

  it('投稿が正常に送信されること', async () => {
    render(<CreatePostDialog open={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText('料理名');
    const priceInput = screen.getByLabelText('料金（円）');
    const submitButton = screen.getByRole('button', { name: /投稿する/ });

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'テスト料理' } });
      fireEvent.change(priceInput, { target: { value: '1000' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(createPostSpy).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('投稿送信中はフォームが無効化されること', async () => {
    createPostSpy.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<CreatePostDialog open={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText('料理名') as HTMLInputElement;
    const priceInput = screen.getByLabelText('料金（円）') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /投稿する/ });

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'テスト料理' } });
      fireEvent.change(priceInput, { target: { value: '1000' } });
      fireEvent.click(submitButton);
    });

    expect(titleInput).toBeDisabled();
    expect(priceInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it('投稿送信に失敗した場合、エラーメッセージが表示されること', async () => {
    createPostSpy.mockResolvedValue({
      type: 'error',
      status: '400',
      title: 'API Error',
      message: '投稿に失敗しました。',
    });

    render(<CreatePostDialog open={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText('料理名');
    const priceInput = screen.getByLabelText('料金（円）');
    const submitButton = screen.getByRole('button', { name: /投稿する/ });

    act(() => {
      fireEvent.change(titleInput, { target: { value: 'テスト料理' } });
      fireEvent.change(priceInput, { target: { value: '1000' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: '予期せぬエラーが発生しました。',
        description: 'コメントの投稿に失敗しました。',
      });
    });
  });

  it('ダイアログが閉じられること', () => {
    render(<CreatePostDialog open={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /Close/ });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});