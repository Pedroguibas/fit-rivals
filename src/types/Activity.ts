import { ActivityType } from "./ActivityType";
import { GroupData } from "./GroupData";
import { User } from "./User";

export type Activity = {
  id: string;
  caption: string;
  picture: string;
  createdAt: string;
  type: ActivityType;
  author: User;
  group: GroupData | null;
  participants: User[];
  reaction: "VALID" | "INVALID" | "UNSURE" | null;
};
