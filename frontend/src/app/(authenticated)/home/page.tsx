import { AllPostList, PostListSkelton } from "@/feature/posts/components/AllPostList";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <div className="flex-1 ml-20">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-primary-600">みんなの投稿</h1>
          </header>
          <main className="space-y-8">
            <Suspense fallback={
              [...Array(5)].map((_, i) => (
                <PostListSkelton key={i} />
              ))
            }>
              <AllPostList />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
