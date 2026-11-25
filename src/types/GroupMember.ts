import { User } from "./User";

export interface GroupMember extends User {
  isGroupAdmin: boolean;
}
