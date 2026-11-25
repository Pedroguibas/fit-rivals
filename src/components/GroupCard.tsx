import Colors from "@/constants/Colors";
import { toImageUrl } from "@/helpers/toImageUrl";
import { Group } from "@/types/Group";
import { Image } from "expo-image";
import { router } from "expo-router";
import { EllipsisVertical } from "lucide-react-native";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "./ui/Theme/ThemedText";

type GroupCardProps = {
  group: Group;
  openSettings: (group: Group) => void;
};

const GroupCard = ({ group, openSettings }: GroupCardProps) => {
  const source = group.picture
    ? { uri: toImageUrl(group.picture) }
    : require("@/assets/images/group_pic.png");

  const handlePress = () => {
    router.push({
      pathname: `/app/group`,
      params: { groupId: group.id },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={source} style={styles.picture} />
      <View style={styles.titleContainer}>
        <ThemedText>{group.name}</ThemedText>

        <TouchableOpacity
          style={{ borderRadius: 1000 }}
          onPress={() => openSettings(group)}
        >
          <EllipsisVertical color={Colors.foreground} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  picture: {
    width: "100%",
    aspectRatio: 3 / 2,
    objectFit: "cover",
    resizeMode: "cover",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});

export default GroupCard;
