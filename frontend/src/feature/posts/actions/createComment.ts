'use server';

import { ApiClient } from "@/api/api";
import { createCommentRequestDto } from "../types/dtos/createCommentRequestDto";
import { revalidateTag } from "next/cache";
import { RevalidateTag } from "@/constants/revalidateTag";
import { ApiResponse, isApiError } from "@/api/types";

export const createComment = async (request: createCommentRequestDto): Promise<ApiResponse<void> | undefined> => {
  const response = await ApiClient().Post<createCommentRequestDto, undefined>('posts/comments', request);
  if (isApiError(response)) {
    return response
  }

  revalidateTag(RevalidateTag.GetAllPostList)
};
