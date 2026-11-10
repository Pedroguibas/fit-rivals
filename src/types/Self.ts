import { User } from "./User";

export interface Self extends User {
  friendCode: string;
  role: "USER" | "ADMIN";
}
