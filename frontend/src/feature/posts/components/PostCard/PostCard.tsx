import Link from "next/link";
import { Post } from "../../types";
import { JapaneseYen } from "lucide-react";

export type PostCardProps = {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-primary-200 rounded-full mr-4 flex items-center justify-center text-primary-600 font-bold text-xl">
            {post.username[0]}
          </div>
          <div>
            <Link href={"/profile"}>
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
          {/* TODO: implement like and comment */}
          {/* <button onClick={() => handleLike(post.postId)} className="flex items-center text-red-500 hover:text-red-600 transition-colors duration-200">
                <Heart size={20} className="mr-1" />
                <span>{post.likes}</span>
              </button>

              <button className="flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-200">
                <MessageCircle size={20} className="mr-1" />
                <span>{post.comments.length}</span>
              </button> */}
        </div>
        {/* TODO: add comments */}
        {/* <div className="mb-4 space-y-2">
              {post.comments.map(comment => (
                <div key={comment.id} className="bg-secondary-100 rounded-lg p-3">
                  <span className="font-semibold mr-2 text-primary-600">{comment.username}</span>
                  <span className="text-secondary-700">{comment.text}</span>
                </div>
              ))}
            </div> */}

        {/* TODO: add comment form */}
        {/* <form onSubmit={(e) => {
              e.preventDefault()
              const input = e.currentTarget.elements.namedItem('comment') as HTMLInputElement
              if (input.value.trim()) {
                handleComment(post.postId, input.value.trim())
                input.value = ''
              }
            }} className="flex">
              <input
                type="text"
                name="comment"
                placeholder="コメントを追加..."
                className="flex-grow border border-secondary-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button type="submit" className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800 transition-colors duration-200">
                投稿
              </button>
            </form> */}
      </div>
    </div>
  )
}