import Link from "next/link";
import { Post } from "../../types";
import { JapaneseYen, MessageCircle } from "lucide-react";
import { Like } from "../Like";
import { Comment } from "../Comment";
import { CreateCommentForm } from "../CreateCommentForm/CreateCommentForm";

export type PostCardProps = {
  post: Post;
  loginUserId: string;
}

export const PostCard = ({ post, loginUserId }: PostCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div>
            <Link href={`/profile/${post.userId}`}>
              <span className="font-semibold text-lg block">{post.username}</span>
            </Link>
          </div>
        </div>
        {/* TODO: add image */}
        {/* <div className="mb-4 relative aspect-video"> */}
        {/* <Image src={post.imageUrl} alt={post.dishName} layout="fill" objectFit="cover" className="rounded-lg" /> */}
        {/* </div> */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-primary-700">{post.title}</h2>
          <p className="text-lg font-bold text-primary-500 flex items-center">
            <JapaneseYen size={20} className="mr-1" />
            {post.price.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center mb-4 space-x-4">
          <Like post={post} loginUserId={loginUserId} />
          <button className="flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-200">
            <MessageCircle size={20} className="mr-1" />
            <span>{post.comments.length}</span>
          </button>
        </div>
        <div className="mb-4 space-y-2">
          {post.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <CreateCommentForm loginUserId={loginUserId} post={post} />
      </div>
    </div>
  )
}
