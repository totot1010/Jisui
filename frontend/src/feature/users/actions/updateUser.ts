'use server'

import { redirect } from "next/navigation"
import { ApiClient } from "@/api/api"
import { UpdateUserRequestDto } from "../types/dtos/updateUserDto"
import { isApiError } from "@/api/types";

export const updateUser = async (userId: string, request: UpdateUserRequestDto) => {
  const username = request.username
  const email = request.email
  const password = request.password
  const confirmPassword = request.confirmPassword

  if (!username || !email) {
    return {
      type: 'error',
      status: 'error',
      message: 'ユーザー名とメールアドレスは必須です'
    }
  }

  if (password !== confirmPassword) {
    return {
      type: 'error',
      status: 'error',
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
