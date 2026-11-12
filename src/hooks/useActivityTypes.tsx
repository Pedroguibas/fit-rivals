import { getActivityTypes } from "@/api/activities";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const activityTypesQueryOptions = queryOptions({
  queryKey: ["activityTypes"],
  queryFn: getActivityTypes,
  staleTime: 1000 * 60 * 10,
});

const useActivityTypes = () => useQuery(activityTypesQueryOptions);

export default useActivityTypes;
