import { ApiClient } from "@/api/api";
import { isApiError } from "@/api/types";

type CookingHeatMapProps = {
  userId: string;
};

export const CookingHeatMap = async ({ userId }: CookingHeatMapProps) => {
  const response = await ApiClient().Get<{ startDate: string, endDate: string }, { userPostHistory: { date: string, count: number }[] }>(
    `posts/users/${userId}/history`,
    {
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString(),
      endDate: new Date().toISOString(),
    }
  );

  if (isApiError(response)) {
    return <p className="text-3xl font-bold text-red-500">{response.message || "エラーが発生しました"}</p>;
  }

  const cookingHistory = response.data.userPostHistory;

  return (
    <div className="flex space-x-1 overflow-x-auto pb-4">
      {Array.from({ length: 53 }).map((_, i) => (
        <div key={i} className="grid grid-rows-7 gap-1">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const index = i * 7 + day;
            const data = cookingHistory[index];
            if (!data) {
              return (
                // 今日を最新にしたいため、未来の日付となる要素は表示しない
                <></>
              )
            }
            return (
              <div
                key={day}
                className={`w-3 h-3 rounded-sm ${data ? getColor(data.count) : "bg-gray-100"}`}
                title={`${new Date(data?.date || "").toLocaleDateString()}: ${data?.count || 0}回`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

const getColor = (count: number) => {
  if (count === 0) return "bg-gray-100";
  if (count === 1) return "bg-orange-200";
  if (count === 2) return "bg-orange-300";
  return "bg-orange-400";
};
