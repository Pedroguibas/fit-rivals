import { getFriendRequests } from "@/api/social";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const friendRequestsQueryOptions = queryOptions({
  queryKey: ["friendRequests"],
  queryFn: getFriendRequests,
  staleTime: 1000 * 60,
});

const useFriendRequests = () => useQuery(friendRequestsQueryOptions);

export default useFriendRequests;
