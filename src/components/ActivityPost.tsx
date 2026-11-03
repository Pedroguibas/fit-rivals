import { reactToActivity } from "@/api/activities";
import Colors from "@/constants/Colors";
import timeAgo from "@/helpers/timeAgo";
import { Activity } from "@/types/Activity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, EllipsisVertical, Minus, User, X } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./ui/Theme/ThemedText";

type ActivityPostProps = {
  activity: Activity;
};

const ActivityPostActions = ({
  activityId,
  reaction,
}: {
  activityId: string;
  reaction: "UNSURE" | "VALID" | "INVALID" | null;
}) => {
  const [currentReaction, setCurrentReaction] = useState(reaction);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (r: "UNSURE" | "VALID" | "INVALID") =>
      reactToActivity(activityId, r),

    onMutate: async (r) => {
      setCurrentReaction(r);
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      const previous = queryClient.getQueryData<Activity[]>(["feed"]);

      queryClient.setQueryData<Activity[]>(["feed"], (old) => {
        old?.map((a) => (a.id === activityId ? { ...a, reaction: r } : a));
      });

      return previous;
    },

    onError: (_err, _r, ctx) => {
      queryClient.setQueryData(["feed"], ctx);
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey: ["feed"] }),
  });

  return (
    <View style={styles.actions}>
      <Pressable>
        <Check
          onPress={() => mutate("VALID")}
          color={
            currentReaction == "VALID"
              ? Colors.success
              : Colors.foregroundSecondary
          }
        />
      </Pressable>
      <Pressable>
        <Minus
          onPress={() => mutate("UNSURE")}
          color={
            currentReaction == "UNSURE"
              ? Colors.warning
              : Colors.foregroundSecondary
          }
        />
      </Pressable>
      <Pressable>
        <X
          onPress={() => mutate("INVALID")}
          color={
            currentReaction == "INVALID"
              ? Colors.danger
              : Colors.foregroundSecondary
          }
        />
      </Pressable>
    </View>
  );
};

const ActivityPost = ({ activity }: ActivityPostProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userHeader}>
          <View style={styles.userPictureContainer}>
            {activity.author.picture ? (
              <Image
                source={{ uri: activity.author.picture }}
                style={styles.userPicture}
              />
            ) : (
              <User color={Colors.primaryDarker} />
            )}
          </View>
          <View>
            <ThemedText>{activity.author.name}</ThemedText>
            <ThemedText fontSize={12} variant="tertiary">
              {activity.type.name}
            </ThemedText>
          </View>
        </View>
        <Pressable>
          <EllipsisVertical size={20} color={Colors.foreground} />
        </Pressable>
      </View>
      <View style={styles.postPictureContainer}>
        <Image source={{ uri: activity.picture }} style={styles.postPicture} />
      </View>
      <ActivityPostActions
        activityId={activity.id}
        reaction={activity.reaction}
      />
      <View>
        <ThemedText>{activity.caption}</ThemedText>
        <ThemedText fontSize={12} variant="tertiary">
          {timeAgo(activity.createdAt)}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userPictureContainer: {
    height: 28,
    aspectRatio: 1,
    borderRadius: 1000,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "cover",
    backgroundColor: Colors.primary,
  },
  userPicture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  userNameContainer: {},
  postPictureContainer: {
    width: "100%",
    aspectRatio: 1,
    objectFit: "cover",
    overflow: "hidden",
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
  },
  postPicture: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
});

export default ActivityPost;
