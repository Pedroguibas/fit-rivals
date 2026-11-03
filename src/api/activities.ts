import type { Activity } from "@/types/Activity";
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
