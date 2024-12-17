import { Post } from "../../types";
import { PostCard } from "../PostCard";

export const AllPostList = async () => {
  const response = await fetch('http://localhost:8787/api/v1/posts');
  const posts = await response.json();

  return (
    <main className="space-y-8">
      {posts.map((post: Post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </main>
  )
}