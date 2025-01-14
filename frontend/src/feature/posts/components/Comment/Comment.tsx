import { PostComment } from "../../types";

type CommentProps = {
  comment: PostComment
}

export const Comment = ({ comment }: CommentProps) => {
  return (
    <div key={comment.id} className="bg-secondary-100 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-primary-600">{comment.username}</span>
        <span className="text-xs text-secondary-500">
          {new Date(comment.createdAt).toLocaleDateString('ja-JP')}
        </span>
      </div>
      <span className="text-secondary-700">{comment.content}</span>
    </div>
  )
}