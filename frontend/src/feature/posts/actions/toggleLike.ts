'use server';

import { ApiClient, ApiResponse, isApiError } from "@/api/api";
import { toggleLikeRequestDto } from "../types/dtos/toggleLikeRequestDto";
import { revalidateTag } from "next/cache";
import { RevalidateTag } from "@/constants/revalidateTag";

type toggleLikeResponse = {
  message: string;
}

export const toggleLike = async (request: toggleLikeRequestDto): Promise<ApiResponse<toggleLikeResponse>> => {
  const response = await ApiClient().Post<toggleLikeRequestDto, toggleLikeResponse>('posts/likes', request);
  if (isApiError(response)) {
    return response
  }
  revalidateTag(RevalidateTag.GetAllPostList)
  return response;
};
