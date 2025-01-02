'use server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('userId');
  cookieStore.delete('username');
  redirect('/login');
};