import { ApiClient, isApiError } from "@/api/api";
import { GetUserResponseDto } from "../../types";
import { Edit } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

type UserInfoProps = {
  userId: string
}

export const UserInfo = async ({ userId }: UserInfoProps) => {
  // ユーザーが自分のプロフィールを見ているかどうか
  const cookieStore = await cookies();
  const loginUserId = cookieStore.get('userId')?.value;

  if (!loginUserId && loginUserId !== userId) {
    return <p className="text-red-500">ユーザーの取得に失敗しました</p>;
  }
  const isMyself = loginUserId === userId;

  // ユーザー情報を取得
  const response = await ApiClient().Get<undefined, GetUserResponseDto>(`users/${userId}`);
  if (isApiError(response)) {
    return <p className="text-red-500">{response.message ?? 'ユーザーの取得に失敗しました'}</p>;
  }
  const user = response.data;

  return (
    <div className="relative mb-6">
      <div className="flex items-center">
        <div>
          <h1 className="text-2xl font-bold">{user.username}</h1>
          <p className="text-gray-600">@{user.userId}</p>
        </div>
      </div>

      {isMyself && (
        <Link
          href="/profile/edit"
          className="absolute top-0 right-0 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center text-sm"
        >
          <Edit size={16} className="mr-1" />
          プロフィールを編集
        </Link>
      )}
    </div>
  )
}