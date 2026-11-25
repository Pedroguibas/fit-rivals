import { Activity } from "@/types/Activity";
import { Group } from "@/types/Group";
import { GroupInvite } from "@/types/GroupInvite";
import { GroupMember } from "@/types/GroupMember";
import { CreateGroupRequest } from "@/types/requests/CreateGroupRequest";
import { privateApi } from "@/utils/api";

export const createGroup = async (body: CreateGroupRequest) => {
  await privateApi.post("/groups", body);
};

export const getGroups = async (): Promise<Group[]> => {
  const { data } = await privateApi.get("/groups");

  return data;
};

export const leaveGroup = async (id: string) => {
  await privateApi.post(`/groups/${id}/leave`);
};

export const getGroupActivities = async (id: string): Promise<Activity[]> => {
  const { data } = await privateApi.get(`/groups/${id}/activities`);

  return data;
};

export const getGroupInvites = async (): Promise<GroupInvite[]> => {
  const { data } = await privateApi.get("/groups/invites");

  return data;
};

export const getGroupMembers = async (id: string): Promise<GroupMember[]> => {
  const { data } = await privateApi.get(`/groups/${id}/members`);

  return data;
};

export const inviteToGroup = async (group: string, users: string[]) => {
  await privateApi.post(`/groups/${group}/invite`, { users });
};

export const acceptGroupInvite = async (id: string) => {
  await privateApi.post(`/groups/invites/${id}/accept`);
};

export const denyGroupInvite = async (id: string) => {
  await privateApi.post(`/groups/invites/${id}/deny`);
};

export const promoteMember = async (group: string, members: string[]) => {
  await privateApi.patch(`/groups/${group}/members/promote`, { members });
};

export const demoteMember = async (group: string, members: string[]) => {
  await privateApi.patch(`/groups/${group}/members/demote`, { members });
};

export const deleteGroup = async (id: string) => {
  await privateApi.delete(`/groups/${id}`);
};
