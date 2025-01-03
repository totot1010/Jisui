import { AllPostSideNav } from "@/feature/posts/components/AllPostSideNav";
import { cookies } from "next/headers";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    // 基本的にはエラーは発生しないが、型エラーを回避するためにthrowしている
    throw new Error('userIdが取得できませんでした');
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <AllPostSideNav userId={userId} />
        {children}
      </div>
    </div>
  )
}