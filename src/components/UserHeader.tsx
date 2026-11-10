import { User } from "@/types/User";
import { Image, View } from "react-native";
import ThemedText from "./ui/Theme/ThemedText";

export type UserHeaderProps = {
  user: User;
  avatarSize?: number;
  fontSize?: number;
};

const UserHeader = ({
  user,
  avatarSize = 36,
  fontSize = 16,
}: UserHeaderProps) => {
  const source = user.picture
    ? { uri: user.picture }
    : require("@/assets/images/user_pic.png");

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
      }}
    >
      <Image
        source={source}
        style={{
          aspectRatio: 1,
          objectFit: "cover",
          borderRadius: 1000,
          height: avatarSize,
          width: avatarSize,
        }}
      />
      <ThemedText style={{ textAlignVertical: "center" }} fontSize={fontSize}>
        {user.name}
      </ThemedText>
    </View>
  );
};

export default UserHeader;
