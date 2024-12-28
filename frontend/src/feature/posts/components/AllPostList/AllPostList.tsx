import { ApiClient, isApiError } from "@/api/api";
import { Post } from "../../types";
import { PostCard } from "../PostCard";

export const AllPostList = async () => {
  const response = await ApiClient().Get<undefined, Post[]>('posts');

  if (isApiError(response)) {
    return <div>{response.message}</div>;
  }

  const posts = response.data;

  return (
    <main className="space-y-8">
      {posts.map((post: Post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </main>
  )
}