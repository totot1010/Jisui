import { ApiClient, isApiError } from '@/api/api'
import { UserEditForm } from '../UserEditForm/UserEditForm'
import { GetUserResponseDto } from '../../types'

type UserEditProps = {
  userId: string
}

export const UserEdit = async ({ userId }: UserEditProps) => {
  const response = await ApiClient().Get<undefined, GetUserResponseDto>(`users/${userId}`);
  if (isApiError(response)) {
    return <p className="text-red-500">{response.message ?? 'ユーザーの取得に失敗しました'}</p>;
  }
  const user = response.data;

  return (
    <UserEditForm user={user} />
  )
}
