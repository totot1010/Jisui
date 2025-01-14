'use server'

import { ApiClient } from "@/api/api";
import { ApiResponse } from "@/api/types";
type refreshAccessTokenRequest = {
  refreshToken: string;
}

type refreshAccessTokenResponse = {
  accessToken: string;
}

export const refreshAccessToken = async (refreshToken: string): Promise<ApiResponse<refreshAccessTokenResponse>> => {
  return await ApiClient().Post<refreshAccessTokenRequest, refreshAccessTokenResponse>('auth/refresh', { refreshToken }, false);
};