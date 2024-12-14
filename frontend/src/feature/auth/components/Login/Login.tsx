'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginView from './view/Login'

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
    <LoginView userId={userId} email={email} password={password} error={error} setUserId={setUserId} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
  )
}
