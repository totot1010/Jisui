"use client"

import { useState } from "react";
import { Post } from "../../types";

type Props = {
  loginUserId: string
  post: Post
}

export const CreateCommentForm = ({ loginUserId, post }: Props) => {
  const [comment, setComment] = useState('')

  const handleComment = (postId: string, comment: string) => {
    console.log(postId, comment)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (comment.trim()) {
          handleComment(post.postId, comment.trim())
          setComment('')
        }
      }}
      className="flex">
      <input
        type="text"
        name="comment"
        placeholder="コメントを追加..."
        className="flex-grow border border-secondary-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800 transition-colors duration-200">
        投稿
      </button>
    </form>
  )
}
