"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import SignUpView from "./view/Signup"
import { CreateUserRequestDto } from "../../types/dtos";
import { createUser } from "../../actions/createUser";
import { isApiError } from "@/api/api";

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
      return;
    }
      const data: CreateUserRequestDto = { email, password, username };

      const response = await createUser(data);
      if(isApiError(response)) {
        setError(response.message)
        return;
      }
      router.push("/login")
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
