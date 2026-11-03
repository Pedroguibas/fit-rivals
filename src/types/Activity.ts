import { ActivityType } from "./ActivityType";
import { Group } from "./Group";
import { User } from "./User";

export type Activity = {
  id: string;
  caption: string;
  picture: string;
  createdAt: string;
  type: ActivityType;
  author: User;
  group: Group | null;
  participants: User[];
  reaction: "VALID" | "INVALID" | "UNSURE" | null;
};
