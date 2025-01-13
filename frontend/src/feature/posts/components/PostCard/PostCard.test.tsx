import { render, screen} from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PostCard } from './PostCard';
import { Post } from '../../types';

const post: Post = {
  postId: '1',
  title: 'title',
  price: 1000,
  userId: '1',
  username: 'username',
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: ["id"],
}
const loginUserId = 'userId';

describe('PostCard', () => {

  it('PostCardコンポーネントが表示されていること', () => {
    render(<PostCard post={post} loginUserId={loginUserId}/>)

    expect(screen.getByText(post.username)).toBeInTheDocument();
    expect(screen.getByText(post.price.toLocaleString())).toBeInTheDocument();
  });

  it('投稿者のユーザー名が表示されること', () => {
    render(<PostCard post={post} loginUserId={loginUserId}/>)

    const usernameElement = screen.getByText(post.username);
    expect(usernameElement).toBeInTheDocument();
  });

  it('投稿した料理の価格が表示されること', () => {
  render(<PostCard post={post} loginUserId={loginUserId}/>)

  const postPriceElement = screen.getByText(post.price.toLocaleString());
  expect(postPriceElement).toBeInTheDocument();
  });

  it('投稿者詳細リンクが表示されること', () => {
  render(<PostCard post={post} loginUserId={loginUserId}/>)
  
  const profileLink = screen.getByRole('link', { name: post.username });
  expect(profileLink).toBeInTheDocument();
  });
});

