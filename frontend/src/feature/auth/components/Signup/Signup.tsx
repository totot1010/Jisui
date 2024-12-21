"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SignUpView from "./view/Signup"
import { CreateUserRequestDto } from "../../types/dtos/createUserRequestDto"
import { fetchData } from "@/api/api"
import { User } from "../../types"

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
      const requestBody: CreateUserRequestDto = { email, password, username };
      const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(requestBody),
      }
      await fetchData<User>('users', options);
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
