'use server';

import { revalidateTag } from "next/cache";


export const revalidateGetAllPostList = async () => {
  revalidateTag('/GetAllPostList')
}
