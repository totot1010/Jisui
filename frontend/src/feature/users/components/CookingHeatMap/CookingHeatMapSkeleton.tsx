import { Skeleton } from "@/components/shadcn/skeleton";

export const CookingHeatMapSkeleton = () => {
  return (
    <div className="flex space-x-1 overflow-x-auto pb-4">
      {[...Array(53)].map((_, weekIndex) => (
        <div key={weekIndex} className="grid grid-rows-7 gap-1">
          {[...Array(7)].map((_, dayIndex) => (
            <Skeleton key={dayIndex} className="w-3 h-3 rounded-sm" />
          ))}
        </div>
      ))}
    </div>
  );
};