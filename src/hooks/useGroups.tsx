import { getGroups } from "@/api/groups";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const groupsQueryOptions = queryOptions({
  queryKey: ["groups"],
  queryFn: getGroups,
  staleTime: 1000 * 60 * 5,
});

const useGroups = () => useQuery(groupsQueryOptions);

export default useGroups;
