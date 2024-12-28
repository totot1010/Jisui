'use server'

import { ApiClient, ApiResponse } from "@/api/api";

type refreshAccessTokenRequest = {
  refreshToken: string;
}

type refreshAccessTokenResponse = {
  accessToken: string;
}

export const refreshAccessToken = async (refreshToken: string): Promise<ApiResponse<refreshAccessTokenResponse>> => {
  return await ApiClient().Post<refreshAccessTokenRequest, refreshAccessTokenResponse>('auth/refresh', { refreshToken }, false);
};