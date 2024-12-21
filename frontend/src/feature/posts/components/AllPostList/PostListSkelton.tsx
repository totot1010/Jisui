import { Skeleton } from "@/components/shadcn/skeleton"

export const PostListSkelton = async () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Skeleton className="w-12 h-12 rounded-full mr-4 flex items-center justify-center text-primary-600 font-bold text-xl" />
          <div>
            <Skeleton className="mb-2 w-[200px] h-[20px]" />
          </div>
        </div>
        <div className="mb-4">
          <Skeleton className="mb-2 w-full h-[20px]" />
          <Skeleton className="mr-1 w-[200px] h-[20px]" />
        </div>
        <div className="flex items-center mb-4 space-x-4">
        </div>
      </div>
    </div>
  )
}