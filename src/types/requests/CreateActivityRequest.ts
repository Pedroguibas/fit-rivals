export type CreateActivityRequest = {
  type: number;
  caption: string | null;
  picture: string;
  group: string | null;
  participants: string[] | null;
};
