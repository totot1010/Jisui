'use client';

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { toggleLike } from "../../actions/toggleLike";
import { Post } from "../../types";
import { toast } from "@/hooks/use-toast";

type LikeProps = {
    post: Post
    loginUserId: string
};

export const Like = ({post, loginUserId}: LikeProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO APIが大量に呼ばれた場合を想定してローディングをつける
  const handleLike = async (postId: string, userId: string) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await toggleLike({ postId, userId });
    } catch (error) {
      toast(
        {
          variant: "destructive",
          title: "予期せぬエラーが発生しました。",
          description: "いいねに失敗しました。",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={() => handleLike(post.postId, post.userId)} className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-200 hover:bg-transparent" variant="ghost">
      <Heart size={20} className={`${post.likes.includes(loginUserId) && "fill-red-500"}`} />
      <span>{post.likes.length}</span>
    </Button>
  );
}
