import { getFeed } from "@/api/activities";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const feedQueryOptions = queryOptions({
  queryKey: ["feed"],
  queryFn: getFeed,
  staleTime: 1000 * 60 * 3,
});

const useFeed = () => useQuery(feedQueryOptions);

export default useFeed;
