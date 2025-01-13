import { ApiClient, isApiError } from "@/api/api";
import { Post } from "../../types";
import { PostCard } from "../PostCard";
import { cookies } from "next/headers";
import { RevalidateTag } from "@/constants/revalidateTag";

export const AllPostList = async () => {
  const cookieStore = await cookies();
  const loginUserId = cookieStore.get('userId')?.value;

  if (!loginUserId) {
    // 基本的にはエラーは発生しないが、型エラーを回避するためにthrowしている
    throw new Error('userIdが取得できませんでした');
  }
  
  const response = await ApiClient().Get<undefined, Post[]>('posts', undefined, true, { next: { tags: [RevalidateTag.GetAllPostList] } });
  if (isApiError(response)) {
    return <div>{response.message}</div>;
  }

  const posts = response.data;

  return (
    <main className="space-y-8">
      {posts.map((post: Post) => (
        <PostCard key={post.postId} post={post} loginUserId={loginUserId}/>
      ))}
    </main>
  )
}
