'use server';

import { ApiClient } from "@/api/api";
import { CreateUserRequestDto } from "../types/dtos";
import { ApiResponse } from "@/api/types";

export const createUser = async (request: CreateUserRequestDto): Promise<ApiResponse<void>> => {
  return await ApiClient().Post<CreateUserRequestDto, void>('users', request, false);
};