'use client'

import { Input } from '@/components/shadcn/input'
import Link from 'next/link'

type LoginViewProps = {
  userId: string
  email: string
  password: string
  error: string
  setUserId: (userId: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  handleSubmit: (e: React.FormEvent) => void
}

export default function LoginView(
  { userId, email, password, error, setUserId, setEmail, setPassword, handleSubmit }: LoginViewProps
) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          ログイン
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        アカウントをお持ちでないですか？{' '}
        <Link href="/signup" className="text-blue-500 hover:underline">
          サインアップ
        </Link>
      </p>
    </div>
  )
}
