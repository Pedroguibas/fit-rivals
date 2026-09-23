import { publicApi } from "@/utils/api";

export const login = async (
  user: string,
  password: string,
): Promise<{ access_token: string; refresh_token: string }> => {
  const response = await publicApi.post("/auth/login", {
    user,
    password,
  });

  if (!response.data) throw new Error();

  return await response.data;
};

export const refresh = async (
  refresh_token: string,
): Promise<{ access_token: string; refresh_token: string }> => {
  const { data } = await publicApi.post("/auth/refresh", { refresh_token });

  if (!data.access_token) throw new Error();

  return data;
};

export const logout = async (refresh_token: string) => {
  await publicApi.post("/auth/logout", { refresh_token });
};
