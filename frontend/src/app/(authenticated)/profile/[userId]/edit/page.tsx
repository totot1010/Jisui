import { UserEdit } from '@/feature/users/components/UserEdit/UserEdit'

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;
  return (
    <UserEdit userId={userId} />
  )
}
