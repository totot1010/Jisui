import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Post } from '../../types';
import { Like } from './Like';
import * as toggleLikeModule from '@/feature/posts/actions/toggleLike';
import { toast } from '@/hooks/use-toast';

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

const LikeSpy = vi.spyOn(toggleLikeModule, 'toggleLike').mockResolvedValue({ data: { message: "" }, type: "success" });

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn().mockResolvedValue(undefined),
}));

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
    expect(LikeSpy).toHaveBeenCalledWith({postId: post.postId, userId: loginUserId});
  });

  it('いいねに失敗した場合、toast関数が呼ばれること', async () => {
    LikeSpy.mockResolvedValue({ type: "error", status: "500" });

    render(<Like post={post} loginUserId={loginUserId}/>)

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast).toHaveBeenCalled();
      expect(toast).toHaveBeenCalledWith({ variant: 'destructive', title: '予期せぬエラーが発生しました。', description: 'いいねに失敗しました。' });
    });
  });

});
