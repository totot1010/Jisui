import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Comment } from './Comment';
import { PostComment } from '../../types';

describe('Comment', () => {
  const mockComment: PostComment = {
    id: '1',
    content: 'テストコメント',
    username: 'テストユーザー',
    createdAt: '2024-03-20T10:00:00.000Z',
    updatedAt: '2024-03-20T10:00:00.000Z',
    userId: '1',
    postId: '1'
  };

  it('ユーザー名が表示されること', () => {
    const { getByText } = render(<Comment comment={mockComment} />);
    expect(getByText('テストユーザー')).toBeInTheDocument();
  });

  it('コメント内容が表示されること', () => {
    const { getByText } = render(<Comment comment={mockComment} />);
    expect(getByText('テストコメント')).toBeInTheDocument();
  });

  it('日付が正しいフォーマットで表示されること', () => {
    const { getByText } = render(<Comment comment={mockComment} />);
    expect(getByText('2024/3/20')).toBeInTheDocument();
  });
});
