import { Suspense } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card"
import { UserEdit } from '@/feature/users/components/UserEdit/UserEdit'

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;
  return (
    <>
      <Link href={`/profile/${userId}`} className="flex items-center text-primary-600 mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        マイページ
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>プロフィール編集</CardTitle>
          <CardDescription>あなたのプロフィール情報を更新します。</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={<div>Loading...</div>}>
            <UserEdit userId={userId} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  )
}
