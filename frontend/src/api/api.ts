'use server'

export const fetchData = async <T>(url: string, options: RequestInit): Promise<T> => {
  const response = await fetch(`${process.env.API_ENDPOINT}${url}`, options);
  if (!response.ok) {
    throw new Error('response error');
  }
  const data: T = await response.json();
  return data;
};
