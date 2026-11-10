import { User } from "./User";

export type FriendRequest = {
  id: string;
  requester: User;
  user: User;
};
