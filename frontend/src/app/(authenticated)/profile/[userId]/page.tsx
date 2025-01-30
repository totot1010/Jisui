import { AllPostList, PostListSkelton } from '@/feature/posts/components/AllPostList';
import { ProfileCard } from '@/feature/users/components/ProfileCard'
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;

  return (
    <div className="container mx-auto p-4">
      <ProfileCard userId={userId} />
      <div className="p-4">
        <h1 className="text-3xl font-bold text-primary-600">投稿一覧</h1>
        <main className="space-y-8">
          <Suspense fallback={
            [...Array(5)].map((_, i) => (
              <PostListSkelton key={i} />
            ))
          }>
            <AllPostList userId={userId}/>
          </Suspense>
        </main>
      </div>
    </div>
  )
}
