'use server'

import { revalidateTag } from "next/cache";
import { ApiClient } from "@/api/api";
import { ApiResponse, isApiError } from "@/api/types";
import { RevalidateTag } from "@/constants/revalidateTag";

export const createPost = async (request: FormData): Promise<ApiResponse<void> | undefined> => {
  const title = request.get('title') as string;
  const price = Number(request.get('price'));
  const image = request.get('image') as File | null;

  console.log(title, price, image)

  const formData = new FormData();
  formData.append('title', title);
  formData.append('price', price.toString());
  if (image) {
    formData.append('image', image);
  }

  const response = await ApiClient().Post<FormData, undefined>('posts', formData);
  if (isApiError(response)) {
    return response
  }

  revalidateTag(RevalidateTag.GetAllPostList)

}