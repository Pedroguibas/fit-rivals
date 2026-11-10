import { CreateUserRequest } from "@/types/requests/CreateUserRequest";
import { Self } from "@/types/Self";
import { privateApi, publicApi } from "@/utils/api";

export const getSelf = async (): Promise<Self> => {
  const { data } = await privateApi.get("/users/self");

  if (!data) throw new Error();

  return data;
};

export const createUser = async (user: CreateUserRequest) => {
  const { data } = await publicApi.post("/users", user);

  if (!data) throw new Error();

  return data;
};

export const emailExists = async (email: string): Promise<boolean> => {
  const { data } = await publicApi.get(`/users/validation/email/${email}`);

  return data;
};

export const usernameExists = async (username: string): Promise<boolean> => {
  const { data } = await publicApi.get(
    `/users/validation/username/${username}`,
  );

  return data;
};
