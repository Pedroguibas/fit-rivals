import { getFeed } from "@/api/activities";
import { useQuery } from "@tanstack/react-query";

export const useFeed = () => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
    staleTime: 1000 * 60 * 3,
  });
};
