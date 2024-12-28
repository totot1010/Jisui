'use server';

import { ApiClient, ApiResponse } from "@/api/api";
import { CreateUserRequestDto } from "../types/dtos";

export const createUser = async (request: CreateUserRequestDto): Promise<ApiResponse<void>> => {
  return await ApiClient().Post<CreateUserRequestDto, void>('users', request, false);
};