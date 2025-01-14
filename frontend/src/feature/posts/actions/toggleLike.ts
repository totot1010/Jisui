'use server';

import { ApiClient } from "@/api/api";
import { ApiResponse, isApiError } from "@/api/types";
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
