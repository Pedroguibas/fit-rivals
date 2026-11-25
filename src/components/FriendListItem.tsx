import Colors from "@/constants/Colors";
import { Friend } from "@/types/Friend";
import { Check, ChevronRight } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import UserHeader from "./UserHeader";

export type FriendListItemProps = {
  friend: Friend;
  onPress?: () => void;
  variant?: "default" | "select";
  selected?: boolean;
};

const FriendListItem = ({
  friend,
  onPress = () => {},
  variant = "default",
  selected = false,
}: FriendListItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <UserHeader user={friend.friend} />
      {variant == "default" ? (
        <ChevronRight color={Colors.foregroundSecondary} />
      ) : (
        <View style={[styles.selectIndicator, selected && styles.selected]}>
          <Check size={16} color={selected ? Colors.background : "#00000000"} />
        </View>
      )}
    </TouchableOpacity>
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
  selectIndicator: {
    borderRadius: 1000,
    padding: 2,
    borderWidth: 1,
    borderColor: Colors.foreground,
  },
  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});

export default FriendListItem;
