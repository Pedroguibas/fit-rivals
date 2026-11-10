import { getFriends } from "@/api/social";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const friendsQueryOptions = queryOptions({
  queryKey: ["friends"],
  queryFn: getFriends,
  staleTime: 1000 * 60 * 5,
});

const useFriends = () => useQuery(friendsQueryOptions);

export default useFriends;
