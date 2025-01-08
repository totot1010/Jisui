'use server'

import { redirect } from "next/navigation"
import { ApiClient, isApiError } from "@/api/api"
import { UpdateUserRequestDto } from "../types/dtos/updateUserDto"

export const updateUser = async (userId: string, request: UpdateUserRequestDto) => {
  const username = request.username
  const email = request.email
  const password = request.password
  const confirmPassword = request.confirmPassword

  if (!username || !email) {
    return {
      success: false,
      message: 'ユーザー名とメールアドレスは必須です'
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: 'パスワードが一致しません'
    }
  }

  const response = await ApiClient().Put<UpdateUserRequestDto, undefined>('users', {
    username,
    email,
    password,
    confirmPassword
  })

  if (isApiError(response)) {
    return response
  }

  redirect(`/profile/${userId}`)
}
