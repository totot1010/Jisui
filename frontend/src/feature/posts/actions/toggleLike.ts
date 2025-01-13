'use server';

import { ApiClient, ApiError, isApiError } from "@/api/api";
import { toggleLikeRequestDto } from "../types/dtos/toggleLikeRequestDto";
import { revalidateTag } from "next/cache";
import { RevalidateTag } from "@/constants/revalidateTag";

export const toggleLike = async (request: toggleLikeRequestDto): Promise<ApiError | void> => {
  const response = await ApiClient().Post<toggleLikeRequestDto, void>('posts/likes', request);
  if (isApiError(response)) {
    return response
  }
  revalidateTag(RevalidateTag.GetAllPostList)
};
