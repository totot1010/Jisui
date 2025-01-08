import { Skeleton } from "@/components/shadcn/skeleton";

export const UserInfoSkeleton = () => {
  return (
    <div className="relative mb-6">
      <div className="flex items-center">
        <div>
          <Skeleton className="w-32 h-8 mb-2" />
          <Skeleton className="w-24 h-6" />
        </div>
      </div>
      <Skeleton className="absolute top-0 right-0 w-32 h-8" />
    </div>
  );
};