import { Suspense } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { CookingCount } from "../CookingCount"
import { CookingHeatMap } from "../CookingHeatMap"
import { UserInfo } from "../UserInfo"
import { UserInfoSkeleton } from "../UserInfo/UserInfoSkeleton"
import { CookingCountSkeleton } from "../CookingCount/CookingCountSkeleton"
import { CookingHeatMapSkeleton } from "../CookingHeatMap/CookingHeatMapSkeleton"

type ProfileCardProps = {
  userId: string
}

export const ProfileCard = async ({ userId }: ProfileCardProps) => {
  return (
    <div className="container mx-auto p-4">
      <Link href="/home" className="flex items-center text-primary-600 mb-4">
        <ChevronLeft size={20} />
        <span>みんなの投稿</span>
      </Link>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <Suspense fallback={<UserInfoSkeleton />}>
          <UserInfo userId={userId} />
        </Suspense>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">本日の自炊回数</h2>
            <Suspense fallback={<CookingCountSkeleton />}>
              <CookingCount targetPeriod="today" userId={userId} />
            </Suspense>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">今週の自炊回数</h2>
            <Suspense fallback={<CookingCountSkeleton />}>
              <CookingCount targetPeriod="week" userId={userId} />
            </Suspense>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">年間自炊活動</h2>
          <Suspense fallback={<CookingHeatMapSkeleton />}>
            <CookingHeatMap userId={userId} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}