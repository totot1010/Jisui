'use client'

import LoginView from './view/Login'
import { useLogin } from './hooks';

export default function Login() {
  const {
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <LoginView email={email} password={password} error={error} setEmail={setEmail} setPassword={setPassword} handleSubmit={handleSubmit} />
  )
}
