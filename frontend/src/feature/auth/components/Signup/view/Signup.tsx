"use client"

import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import Link from "next/link"

type SignUpViewProps = {
  userId: string
  setUserId: (userId: string) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  setConfirmPassword: (confirmPassword: string) => void
  error: string
  onSubmit: (e: React.FormEvent) => void
}


export default function SignupView(
  { userId,
    setUserId,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    onSubmit,
  }: SignUpViewProps
) {

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">サインアップ</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            ユーザーID
          </label>
          <Input type="text" id="userId" className="px-3 py-2" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <Input
            type="email"
            id="email"
            className="px-3 py-2"
            value={email}
            placeholder="example@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード
          </label>
          <Input
            type="password"
            id="password"
            className="px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード（確認）
          </label>
          <Input
            type="password"
            id="confirmPassword"
            className="px-3 py-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <Button type="submit" className="w-full ">サインアップ</Button>
      </form>

      <p className="mt-4 text-sm text-center">
        すでにアカウントをお持ちですか？{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          ログイン
        </Link>
      </p>
    </div>
  )
}
