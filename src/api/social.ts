import { Friend } from "@/types/Friend";
import { FriendRequest } from "@/types/FriendRequest";
import { privateApi } from "@/utils/api";

export const getFriends = async (): Promise<Friend[]> => {
  const { data } = await privateApi.get("/friends");

  return data;
};

export const createFriendRequest = async (user: string) => {
  await privateApi.post("/friends/requests", { user });
};

export const getFriendRequests = async (): Promise<FriendRequest[]> => {
  const { data } = await privateApi.get("/friends/requests");

  return data;
};

export const acceptFriendRequest = async (request: string) => {
  await privateApi.post(`/friends/requests/${request}/accept`);
};

export const denyFriendRequest = async (request: string) => {
  await privateApi.post(`/friends/requests/${request}/deny`);
};
