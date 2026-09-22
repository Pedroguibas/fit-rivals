import { api } from "@/utils/api";

export const login = async (
  user: string,
  password: string,
): Promise<{ access_token: string; refresh_token: string }> => {
  const response = await api.post("/auth/login", {
    user,
    password,
  });

  if (!response.data) throw new Error();

  return await response.data;
};

export const refresh = async (
  refresh_token: string,
): Promise<{ access_token: string; refresh_token: string }> => {
  const response = await api.post("/auth/refresh", { refresh_token });

  if (!response.data) throw new Error();

  return await response.data;
};

export const logout = async (refresh_token: string) => {
  await api.post("/auth/logout", { refresh_token });
};
