import Colors from "@/constants/Colors";
import { Friend } from "@/types/Friend";
import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";
import UserHeader from "./UserHeader";

export type FriendListItemProps = {
  friend: Friend;
};

const FriendListItem = ({ friend }: FriendListItemProps) => {
  return (
    <Pressable style={styles.container}>
      <UserHeader user={friend.friend} />
      <ChevronRight color={Colors.foregroundSecondary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
});

export default FriendListItem;
