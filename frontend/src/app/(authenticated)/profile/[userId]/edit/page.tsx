'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ChevronLeft, Upload } from 'lucide-react'

import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card"
import { Label } from "@/components/shadcn/label"

export default function EditProfile() {
  const router = useRouter()
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100")
  const [formData, setFormData] = useState({
    username: "料理好きな太郎",
    email: "taro@example.com",
    userId: "taro_cook",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここでAPIを呼び出してユーザー情報を更新します
    console.log("送信されたデータ:", formData)
    router.push('/profile')
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push('/profile')}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        マイページ
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>プロフィール編集</CardTitle>
          <CardDescription>あなたのプロフィール情報を更新します。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={avatar}
                  alt="アバター"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer"
                >
                  <Upload size={16} />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">アバターを変更</h2>
                <p className="text-sm text-muted-foreground">
                  クリックして新しい画像をアップロード
                </p>
              </div>
            </div>
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
                <Label htmlFor="userId">ユーザーID</Label>
                <Input
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  placeholder="ユーザーID"
                />
              </div>
              <div>
                <Label htmlFor="password">新しいパスワード</Label>
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
            <Button type="submit">変更を保存</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
