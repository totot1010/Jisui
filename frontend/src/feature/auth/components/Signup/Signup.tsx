"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SignUpView from "./view/Signup"

export default function Signup() {
  const [username, setUsername] = useState("")
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
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
      }
      const response = await fetch('http://localhost:8787/api/v1/users', options);
      await response.json();
      router.push("/login")
    } catch (err) {
      console.error(err)
      setError("サインアップに失敗しました。もう一度お試しください。")
    }
  }

  return (
    <SignUpView
      username={username}
      setUsername={setUsername}
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
