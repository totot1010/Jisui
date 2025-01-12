'use client';

import { Button } from "@/components/shadcn/button";
import { Heart } from "lucide-react";
import { toggleLikeRequestDto } from "../../types/dtos/toggleLikeRequestDto";
import { toggleLike } from "../../actions/toggleLike";
import { Post } from "../../types";
import { revalidateGetAllPostList } from "../../actions/revalidateGetAllPostList";

type LikeProps = {
    post: Post
    loginUserId: string
};

export const Like = ({post, loginUserId}: LikeProps) => {

  const handleLike = async (e: React.MouseEvent, postId: string, userId: string) => {
    e.preventDefault()
  
    const requestData:toggleLikeRequestDto = {postId, userId}
    await toggleLike(requestData)
    revalidateGetAllPostList()
  }

  return (
    <Button onClick={(e) => handleLike(e, post.postId, post.userId)} className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-200 hover:bg-transparent" variant="ghost">
      <Heart size={20} className={`${post.likes.includes(loginUserId) && "fill-red-500"}`} />
      <span>{post.likes.length}</span>
    </Button>
  );
}
