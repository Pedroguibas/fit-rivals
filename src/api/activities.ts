import type { Activity } from "@/types/Activity";
import { ActivityType } from "@/types/ActivityType";
import { CreateActivityRequest } from "@/types/requests/CreateActivityRequest";
import { privateApi } from "@/utils/api";

export const getFeed = async (): Promise<Activity[]> => {
  const { data } = await privateApi.get("/activities/feed");

  return data;
};

export const reactToActivity = async (
  id: string,
  reactionType: "VALID" | "INVALID" | "UNSURE",
) => {
  await privateApi.post(`/activities/${id}/reactions`, { reactionType });
};

export const createActivity = async (data: CreateActivityRequest) => {
  await privateApi.post("/activities", data);
};

export const getActivityTypes = async () => {
  const { data } = await privateApi.get("/activities/types");

  return data as ActivityType[];
};
