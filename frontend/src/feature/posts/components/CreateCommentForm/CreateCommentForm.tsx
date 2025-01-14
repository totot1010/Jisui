"use client"

import { useState } from "react";
import { Post } from "../../types";
import { createComment } from "../../actions/createComment";
import { isApiError } from "@/api/types";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  post: Post
}

export const CreateCommentForm = ({ post }: Props) => {
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleComment = async (comment: string) => {
    // すでに送信中の場合は処理を中断
    if (isLoading) {
      return
    }

    const trimmedComment = comment.trim()
    // 空白の場合はコメントを投稿しない
    if (!trimmedComment) {
      return
    }

    setIsLoading(true)
    try {
      // コメントを投稿
      const response = await createComment({ postId: post.postId, content: trimmedComment })
      if (response && isApiError(response)) {
        toast({
          variant: "destructive",
          title: "予期せぬエラーが発生しました。",
          description: "コメントの投稿に失敗しました。",
        })
        return
      }
      setComment('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleComment(comment)
      }}
      className="flex">
      <input
        type="text"
        name="comment"
        placeholder="コメントを追加..."
        className="flex-grow border border-secondary-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800 transition-colors duration-200"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 size={16} className="mr-1" /> : '投稿'}
      </button>
    </form>
  )
}
