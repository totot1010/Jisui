import { ApiClient } from "@/api/api";
import { isApiError } from "@/api/types";

type CookingCountProps = {
  targetPeriod: 'day' | 'week';
  userId: string;
}

export const CookingCount = async ({ targetPeriod, userId }: CookingCountProps) => {
  const response = await ApiClient().Get<{ type: 'day' | 'week' }, { count: number }>(`posts/${userId}/counts`, { type: targetPeriod })

  if (isApiError(response)) {
    // エラーテキストを表示する
    return <p className="text-3xl font-bold text-red-500">{response.message || 'エラーが発生しました'}</p>
  }

  return (
    <p className="text-3xl font-bold text-primary-600">{response.data.count}</p>
  );
}