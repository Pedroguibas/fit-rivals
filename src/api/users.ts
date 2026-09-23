import { User } from "@/types/User";
import { privateApi } from "@/utils/api";

export const getSelf = async (): Promise<User> => {
  const { data } = await privateApi.get("/users/self");

  if (!data) throw new Error();

  return data;
};
