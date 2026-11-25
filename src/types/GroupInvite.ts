import { GroupData } from "./GroupData";
import { User } from "./User";

export type GroupInvite = {
  id: string;
  userId: string;
  inviter: User;
  group: GroupData;
};
