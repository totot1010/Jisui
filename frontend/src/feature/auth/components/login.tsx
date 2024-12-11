'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // TODO: ログイン処理を実装する
      console.log('ログイン:', email, password)
      router.push('/home')
    } catch (err) {
      console.error(err)
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。')
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
            ユーザーID
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
