const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = async (endpoint: string, options?: RequestInit) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, options);
  const data = await response.json();
  return data;
};
