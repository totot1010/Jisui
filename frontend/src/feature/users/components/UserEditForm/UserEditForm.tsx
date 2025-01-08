'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { User } from '../../types'
import { updateUser } from '../../actions/updateUser'

type UserEditFormProps = {
  user: User
}

export const UserEditForm = ({ user }: UserEditFormProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const response = await updateUser(user.userId, formData)
      if (response) {
      setError(response.message || 'ユーザー情報の更新に失敗しました')
      return
    }

      router.push(`/profile/${user.userId}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        <div>
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="ユーザー名"
          />
        </div>
        <div>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="メールアドレス"
          />
        </div>
        <div>
          <Label htmlFor="password">新しいパスワード</Label>
          <p className="text-sm text-gray-500">入力した場合のみ更新します</p>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="新しいパスワード"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">パスワードの確認</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="パスワードの確認"
          />
        </div>
      </div>
      <Button type="submit" disabled={isPending}>変更を保存</Button>
    </form>
  )
}
