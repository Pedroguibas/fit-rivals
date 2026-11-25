import { getGroupInvites } from "@/api/groups";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const groupInvitesQueryOptions = queryOptions({
  queryKey: ["groupInvites"],
  queryFn: getGroupInvites,
  staleTime: 1000 * 60,
});

const useGroupInvites = () => useQuery(groupInvitesQueryOptions);

export default useGroupInvites;
