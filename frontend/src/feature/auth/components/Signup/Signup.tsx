"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SignUpView from "./view/Signup"

export default function Signup() {
  const [userId, setUserId] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("パスワードが一致しません")
      return
    }

    try {
      console.log("サインアップ:", email, password)
      // TODO: サインアップ処理を実装する
      router.push("/login")
    } catch (err) {
      console.error(err)
      setError("サインアップに失敗しました。もう一度お試しください。")
    }
  }

  return (
    <SignUpView
      userId={userId}
      setUserId={setUserId}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      error={error}
      onSubmit={handleSubmit}
    />
  )
}
