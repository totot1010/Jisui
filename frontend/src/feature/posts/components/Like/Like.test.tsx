import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Post } from '../../types';
import { Like } from './Like';
import * as toggleLikeModule from '@/feature/posts/actions/toggleLike';
import * as revalidateGetAllPostListModule from '@/feature/posts/actions/revalidateGetAllPostList';

const post: Post = {
  postId: '1',
  title: 'title',
  price: 1000,
  userId: 'id1',
  username: 'username',
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: ["id1", "id2"],
}
const loginUserId = 'id1';

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
  get: vi.fn().mockReturnValue({ value: '1' }),
  }),
}));

const LikeSpy = vi.spyOn(toggleLikeModule, 'toggleLike').mockResolvedValue();
const revalidateGetAllPostListSpy = vi.spyOn(revalidateGetAllPostListModule, 'revalidateGetAllPostList').mockResolvedValue();

describe('Like', () => {

  it('Likeコンポーネントが表示されること', () => {
    render(<Like post={post} loginUserId={loginUserId}/>)

    expect(screen.getByText(post.likes.length)).toBeInTheDocument();
  });

  it('いいねの数が表示されていること', () => {
    render(<Like post={post} loginUserId={loginUserId}/>)
  
    const likeCountElement = screen.getByText(post.likes.length.toString());
    expect(likeCountElement).toBeInTheDocument();
  });

  it('ログインユーザーがいいねしている場合、いいねアイコンの中が塗られること', () => {
    render(<Like post={post} loginUserId={loginUserId}/>)
  
    const heartIcon = screen.getByRole('button').querySelector('svg');
    expect(heartIcon).toHaveClass('fill-red-500');
  });
  
  it('ログインユーザーがいいねしていない場合、いいねアイロンの中が塗られないこと', () => {
    const newPost = { ...post, likes: ["id2"] };
    render(<Like post={newPost} loginUserId={loginUserId}/>)
  
    const heartIcon = screen.getByRole('button').querySelector('svg');
    expect(heartIcon).not.toHaveClass('fill-red-500');
  });

  it('いいねするとtoggleLikeが呼ばれること', () => {
    render(<Like post={post} loginUserId={loginUserId}/>)

    const button = screen.getByRole('button');
    fireEvent.click(button);
  
    expect(LikeSpy).toHaveBeenCalled();
  });

  it('いいねするとrevalidateGetAllPostListが呼ばれること', () => {
    render(<Like post={post} loginUserId={loginUserId}/>)

    const button = screen.getByRole('button');
    fireEvent.click(button);
  
    waitFor(() => {
      expect(revalidateGetAllPostListSpy).toHaveBeenCalled();
    }) 
  });
});




