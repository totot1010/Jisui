'use server'

import { revalidateTag } from "next/cache";
import { ApiClient } from "@/api/api";
import { ApiResponse, isApiError } from "@/api/types";
import { createPostRequestDto } from "../types/dtos/createPostRequestDto";
import { RevalidateTag } from "@/constants/revalidateTag";

export const createPost = async (request: createPostRequestDto): Promise<ApiResponse<void> | undefined> => {
  const response = await ApiClient().Post<createPostRequestDto, undefined>('posts', request);
  if (isApiError(response)) {
    return response
  }

  revalidateTag(RevalidateTag.GetAllPostList)

}