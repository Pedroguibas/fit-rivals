import { activityTypesQueryOptions } from "@/hooks/useActivityTypes";
import { feedQueryOptions } from "@/hooks/useFeed";
import { friendRequestsQueryOptions } from "@/hooks/useFriendRequests";
import { friendsQueryOptions } from "@/hooks/useFriends";
import { useQueryClient } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useEffect } from "react";

const AppLayout = () => {
  const queryClient = useQueryClient();

  const noop = () => {};

  useEffect(() => {
    queryClient.query(feedQueryOptions).catch(noop);
    queryClient.query(friendsQueryOptions).catch(noop);
    queryClient.query(friendRequestsQueryOptions).catch(noop);
    queryClient.query(activityTypesQueryOptions).catch(noop);
  }, [queryClient]);

  return <Slot />;
};

export default AppLayout;
