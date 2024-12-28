'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ApiClient, ApiError, isApiError } from "@/api/api";
import { LoginRequestDto, LoginResponseDto } from "../types/dtos";

export const login = async (request: LoginRequestDto): Promise<ApiError | void> => {
  const response = await ApiClient().Post<LoginRequestDto, LoginResponseDto>('auth/login', request, false);

  if (isApiError(response)) {
    return response;
  }

  const { accessToken, refreshToken, userId, username } = response.data;
  const cookieStore = await cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  cookieStore.set('userId', userId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  cookieStore.set('username', username, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  redirect('/home');
};